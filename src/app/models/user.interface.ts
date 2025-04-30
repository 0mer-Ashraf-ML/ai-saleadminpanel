export interface IUser {
  id?: string;
  email?: string;
  fullName?: string;
  createdAt?: string;
  isVerified?: boolean;
  lastLogin?: string;
  preferences: {
    theme?: string;
    notifications?: boolean;
  };
  profileData: {
    emailVerified?: boolean;
    emailVerifiedAt?: string;
  };
  stripe_customer_id?: string;
  updatedAt?: string;
  role: string | number;
}
