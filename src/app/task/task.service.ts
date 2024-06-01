import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Subject} from "../subject/subject";
import {Task} from "./task";

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private apiServerUrl=environment.apiBaseUrl;
  constructor(private http:HttpClient) { }
  public getTasksBySubject(user_id:string|null,subject_id:string|null):Observable<Task[]>{
    return this.http.get<Task[]>(`${this.apiServerUrl}/users/${user_id}/subjects/${subject_id}/tasks`);
  }
  public getTasksByUser(user_id:string|null,):Observable<Task[]>{
    return this.http.get<Task[]>(`${this.apiServerUrl}/users/${user_id}/tasks`);
  }

  public addTask(user_id:string|null,subject_id:string|null,task:Task):Observable<Task>{
    return this.http.post<Task>(`${this.apiServerUrl}/users/${user_id}/subjects/${subject_id}/tasks`, task);
  }
  public updateTask(user_id:string|null,subject_id:string|null,task_id:number|undefined, task:Task):Observable<Task>{
    return this.http.put<Task>(`${this.apiServerUrl}/users/${user_id}/subjects/${subject_id}/tasks/${task_id}`, task);
  }
  public deleteTask(user_id:string|null,subject_id:string|null,task_id:number|undefined):Observable<void>{
    return this.http.delete<void>(`${this.apiServerUrl}/users/${user_id}/subjects/${subject_id}/tasks/${task_id}`);
  }

}
