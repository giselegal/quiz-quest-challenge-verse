
export interface User {
  id: string;
  email: string;
  name?: string;
  userName?: string; // Add userName property
  role?: string;
  image?: string;
  createdAt?: Date;
  updatedAt?: Date;
  emailVerified?: Date;
}

export interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  signup: (email: string, password: string, userData?: any) => Promise<void>;
}
