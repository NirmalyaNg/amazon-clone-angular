export interface AuthResponse {
  idToken: string;
  email: string;
  refreshToken: string;
  localId: string;
  expiresIn: string;
  registered: boolean;
  kind?: string;
  displayName?: string;
}
