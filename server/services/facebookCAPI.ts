import crypto from 'crypto';

export interface FacebookEventData {
  event_name: string;
  event_time: number;
  event_source_url: string;
  user_data: {
    email?: string;
    phone?: string;
    first_name?: string;
    last_name?: string;
    client_ip_address?: string;
    client_user_agent?: string;
    fbp?: string; // Facebook browser ID
    fbc?: string; // Facebook click ID
  };
  custom_data?: {
    currency?: string;
    value?: number;
    content_name?: string;
    content_category?: string;
    content_type?: string;
    [key: string]: any;
  };
}

export class FacebookConversionsAPI {
  private pixelId: string;
  private accessToken: string;
  private testEventCode?: string;

  constructor(pixelId: string, accessToken: string, testEventCode?: string) {
    this.pixelId = pixelId;
    this.accessToken = accessToken;
    this.testEventCode = testEventCode;
  }

  /**
   * Hash user data for privacy
   */
  private hashUserData(data: string): string {
    return crypto.createHash('sha256').update(data.toLowerCase().trim()).digest('hex');
  }

  /**
   * Send conversion event to Facebook
   */
  async sendConversionEvent(eventData: FacebookEventData): Promise<any> {
    try {
      // Hash sensitive user data
      const userData = { ...eventData.user_data };
      if (userData.email) {
        userData.email = this.hashUserData(userData.email);
      }
      if (userData.phone) {
        userData.phone = this.hashUserData(userData.phone);
      }
      if (userData.first_name) {
        userData.first_name = this.hashUserData(userData.first_name);
      }
      if (userData.last_name) {
        userData.last_name = this.hashUserData(userData.last_name);
      }

      const payload = {
        data: [{
          ...eventData,
          user_data: userData,
        }],
        test_event_code: this.testEventCode,
      };

      const response = await fetch(
        `https://graph.facebook.com/v18.0/${this.pixelId}/events`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${this.accessToken}`,
          },
          body: JSON.stringify(payload),
        }
      );

      const result = await response.json();

      if (!response.ok) {
        console.error('Facebook CAPI Error:', result);
        throw new Error(`Facebook CAPI Error: ${result.error?.message || 'Unknown error'}`);
      }

      console.log('Facebook CAPI Event sent successfully:', result);
      return result;
    } catch (error) {
      console.error('Error sending Facebook CAPI event:', error);
      throw error;
    }
  }

  /**
   * Track lead conversion (quiz completion)
   */
  async trackLead(userData: {
    email?: string;
    name?: string;
    ipAddress?: string;
    userAgent?: string;
    fbp?: string;
    fbc?: string;
  }, customData?: any): Promise<any> {
    const nameParts = userData.name?.split(' ') || [];
    
    return this.sendConversionEvent({
      event_name: 'Lead',
      event_time: Math.floor(Date.now() / 1000),
      event_source_url: customData?.source_url || 'https://giselegalvao.com.br',
      user_data: {
        email: userData.email,
        first_name: nameParts[0],
        last_name: nameParts.slice(1).join(' '),
        client_ip_address: userData.ipAddress,
        client_user_agent: userData.userAgent,
        fbp: userData.fbp,
        fbc: userData.fbc,
      },
      custom_data: {
        content_name: 'Quiz Completion',
        content_category: 'quiz_result',
        ...customData,
      },
    });
  }

  /**
   * Track purchase conversion
   */
  async trackPurchase(purchaseData: {
    email: string;
    name: string;
    value: number;
    currency: string;
    transactionId: string;
    productName: string;
    ipAddress?: string;
    userAgent?: string;
    fbp?: string;
    fbc?: string;
  }): Promise<any> {
    const nameParts = purchaseData.name.split(' ');
    
    return this.sendConversionEvent({
      event_name: 'Purchase',
      event_time: Math.floor(Date.now() / 1000),
      event_source_url: 'https://giselegalvao.com.br',
      user_data: {
        email: purchaseData.email,
        first_name: nameParts[0],
        last_name: nameParts.slice(1).join(' '),
        client_ip_address: purchaseData.ipAddress,
        client_user_agent: purchaseData.userAgent,
        fbp: purchaseData.fbp,
        fbc: purchaseData.fbc,
      },
      custom_data: {
        currency: purchaseData.currency,
        value: purchaseData.value,
        content_name: purchaseData.productName,
        content_type: 'product',
        transaction_id: purchaseData.transactionId,
      },
    });
  }

  /**
   * Track page view
   */
  async trackPageView(userData: {
    ipAddress?: string;
    userAgent?: string;
    fbp?: string;
    fbc?: string;
  }, pageData: {
    url: string;
    title?: string;
  }): Promise<any> {
    return this.sendConversionEvent({
      event_name: 'PageView',
      event_time: Math.floor(Date.now() / 1000),
      event_source_url: pageData.url,
      user_data: {
        client_ip_address: userData.ipAddress,
        client_user_agent: userData.userAgent,
        fbp: userData.fbp,
        fbc: userData.fbc,
      },
      custom_data: {
        content_name: pageData.title,
      },
    });
  }
}

// Singleton instance
let facebookCAPI: FacebookConversionsAPI | null = null;

export const getFacebookCAPI = (): FacebookConversionsAPI => {
  if (!facebookCAPI) {
    const pixelId = process.env.FACEBOOK_PIXEL_ID;
    const accessToken = process.env.FACEBOOK_ACCESS_TOKEN;
    const testEventCode = process.env.NODE_ENV === 'development' ? process.env.FACEBOOK_TEST_EVENT_CODE : undefined;

    if (!pixelId || !accessToken) {
      throw new Error('Facebook Pixel ID and Access Token must be configured');
    }

    facebookCAPI = new FacebookConversionsAPI(pixelId, accessToken, testEventCode);
  }

  return facebookCAPI;
};
