import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private tokenKey = 'jwt_token';
  private userIdKey = 'user_id';
  private usernameKey = 'username';

  // Call this after successful login
  login(token: string, userId: string, username: string): void {
    localStorage.setItem(this.tokenKey, token);
    localStorage.setItem(this.userIdKey, userId);
    localStorage.setItem(this.usernameKey, username);
  }

  // Remove all auth data
  logout(): void {
    localStorage.removeItem(this.tokenKey);
    localStorage.removeItem(this.userIdKey);
    localStorage.removeItem(this.usernameKey);
  }

  // Check if user is logged in
  get isLoggedIn(): boolean {
    return !!localStorage.getItem(this.tokenKey);  
  }

  get token(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  get userId(): string | null {
    return localStorage.getItem(this.userIdKey);
  }

  get username(): string | null {
    return localStorage.getItem(this.usernameKey);
  }
}