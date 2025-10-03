import { Injectable } from '@angular/core';
import { RegisterRequest, RegisterResponse } from '../../models/register.models';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root' // 👈 makes it available globally
})
export class RegisterService {
  private apiUrl = 'http://localhost:5000/api/auth/register'; // 🔥 adjust to your backend endpoint

  constructor(private http: HttpClient) {}

  register(data: RegisterRequest): Observable<RegisterResponse> {
    return this.http.post<RegisterResponse>(this.apiUrl, data);
  }
}