// src/app/services/Auth/login.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LoginRequest, LoginResponse } from '../../models/login.models';


@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private apiUrl = 'https://localhost:7105/api/v1/login';

  constructor(private http: HttpClient) {}

  login(credentials: LoginRequest): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(this.apiUrl, credentials);
  }
}
