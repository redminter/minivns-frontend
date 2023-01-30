import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {User} from "./user";
import {environment} from "../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private apiServerUrl=environment.apiBaseUrl;
  // environment.apiBaseUrl'';
  constructor(private http:HttpClient) { }
  public getUsers():Observable<User[]>{
    return this.http.get<User[]>(`${this.apiServerUrl}/users`);
  }

  public addUser(user:User):Observable<User>{
    return this.http.post<User>(`${this.apiServerUrl}/users`, user);
  }
  public updateUser(userId:number, user:User):Observable<User>{
    return this.http.put<User>(`${this.apiServerUrl}/users/${userId}`, user);
  }
  public deleteUser(userId:number):Observable<void>{
    return this.http.delete<void>(`${this.apiServerUrl}/users/${userId}`);
  }
}
