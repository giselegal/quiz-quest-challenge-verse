/**
 * Utility to replace all Cloudinary URLs with ImageKit paths across the application
 */

import { replaceImageUrl } from './imageUrlMapper';

export const replaceImageInString = (content: string): string => {
  // Regex to match Cloudinary URLs
  const cloudinaryRegex = /https:\/\/res\.cloudinary\.com\/[^'"\s]+/g;
  
  return content.replace(cloudinaryRegex, (match) => {
    return replaceImageUrl(match);
  });
};

export const replaceCloudinaryUrls = (obj: any): any => {
  if (typeof obj === 'string') {
    return replaceImageInString(obj);
  }
  
  if (Array.isArray(obj)) {
    return obj.map(replaceCloudinaryUrls);
  }
  
  if (obj && typeof obj === 'object') {
    const result: any = {};
    for (const [key, value] of Object.entries(obj)) {
      result[key] = replaceCloudinaryUrls(value);
    }
    return result;
  }
  
  return obj;
};