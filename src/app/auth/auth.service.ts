import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {AuthLoginInfo} from "./login-info";
import {Observable} from "rxjs";
import {JwtResponse} from "./jwt-response";
import {environment} from "../../environments/environment";

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiServerUrl=environment.apiBaseUrl;

  attemptAuth(credentials: AuthLoginInfo): Observable<JwtResponse> {
    return this.http.post<JwtResponse>(`${this.apiServerUrl}/auth/login`, credentials, httpOptions);
  }
  constructor(private http:HttpClient) { }
}
