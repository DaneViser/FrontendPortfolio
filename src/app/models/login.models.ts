export interface LoginRequest {
  username: string;
  password: string;
}

export interface LoginResponse {
  jwt: string;
  userId: string;
  username: string;
}