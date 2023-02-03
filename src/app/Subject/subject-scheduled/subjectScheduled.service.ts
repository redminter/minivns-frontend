import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../../environments/environment";
import {Subject} from "../subject";


@Injectable({
  providedIn: 'root'
})
export class SubjectScheduledService {

  private apiServerUrl=environment.apiBaseUrl;
  constructor(private http:HttpClient) { }
  public getSubjectsSchedule():Observable<Subject[]>{
    return this.http.get<Subject[]>(`${this.apiServerUrl}/subjects/schedule`);
  }

}


