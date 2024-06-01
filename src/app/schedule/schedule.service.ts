import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Schedule} from "./schedule";
import {Subject} from "../subject/subject";


@Injectable({
  providedIn: 'root'
})
export class ScheduleService {

  private apiServerUrl=environment.apiBaseUrl;
  constructor(private http:HttpClient) { }
  public getSchedule():Observable<Schedule[]>{
    return this.http.get<Schedule[]>(`${this.apiServerUrl}/schedule`);
  }
  public getOne(schedule_id:any):Observable<Schedule>{
    return this.http.get<Schedule>(`${this.apiServerUrl}/subjects/${schedule_id}`);
  }

  public addSchedule(schedule:Schedule):Observable<Schedule>{
    return this.http.post<Schedule>(`${this.apiServerUrl}/schedule`, schedule);
  }
  public updateSchedule(schedule_id:number|undefined,schedule:Schedule):Observable<Schedule>{
    return this.http.put<Schedule>(`${this.apiServerUrl}/schedule/${schedule_id}`, schedule);
  }
  public deleteSchedule(schedule_id:number|undefined):Observable<void>{
    return this.http.delete<void>(`${this.apiServerUrl}/schedule/${schedule_id}`);
  }
}
