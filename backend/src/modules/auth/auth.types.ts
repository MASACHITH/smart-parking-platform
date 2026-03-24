export interface AuthenticatedUser {
  userId: string;
  customerId: string;
  email: string;
  roleCodes: string[];
}

export interface LoginRequest {
  customerId: string;
  email: string;
  password: string;
}

export interface AuthTokenPayload extends AuthenticatedUser {
  exp: number;
}
