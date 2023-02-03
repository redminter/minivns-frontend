import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../environments/environment";
import {Subject} from "./subject";

@Injectable({
  providedIn: 'root'
})
export class SubjectService {

  private apiServerUrl=environment.apiBaseUrl;
  constructor(private http:HttpClient) { }
  public getSubjects():Observable<Subject[]>{
    return this.http.get<Subject[]>(`${this.apiServerUrl}/subjects`);
  }
  public getSubjectsSchedule():Observable<Subject[]>{
    return this.http.get<Subject[]>(`${this.apiServerUrl}/subjects/schedule`);
  }

  public addSubject(user:Subject):Observable<Subject>{
    return this.http.post<Subject>(`${this.apiServerUrl}/subjects`, user);
  }
  public updateSubject(subjectId:number|undefined,subject:Subject):Observable<Subject>{
    return this.http.put<Subject>(`${this.apiServerUrl}/subjects/${subjectId}`, subject);
  }
  public deleteSubject(subjectId:number|undefined):Observable<void>{
    return this.http.delete<void>(`${this.apiServerUrl}/subjects/${subjectId}`);
  }

}


