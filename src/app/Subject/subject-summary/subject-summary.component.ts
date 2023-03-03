import { Component } from '@angular/core';
import {Subject} from "../subject";
import {HttpErrorResponse} from "@angular/common/http";
import {SubjectService} from "../subject.service";
import {TokenStorageService} from "../../auth/token-storage.service";
import {OnInit} from "@angular/core";
import {Task} from "../../task/task";
import {TaskService} from "../../task/task.service";

@Component({
  selector: 'app-subject-summary',
  templateUrl: './subject-summary.component.html',
  styleUrls: ['./subject-summary.component.css']
})
export class SubjectSummaryComponent implements OnInit {

  public subjects: Subject[] = [];
  // @ts-ignore
  user_id:any;
  // @ts-ignore
  role: string;
  // @ts-ignore
  authority: string;
  info: any;
  user_firstname:any;
  user_lastname:any;
  username:any;
  constructor(private subjectService: SubjectService, private tokenStorage: TokenStorageService, private taskService: TaskService) {
  }
  // @ts-ignore
  ngOnInit() {
    this.getSubjects();
    this.user_id=this.tokenStorage.getId();
    this.username= this.tokenStorage.getUsername();
    this.authority=this.tokenStorage.getAuthority();
    this.user_firstname=this.tokenStorage.getFirstname();
    this.user_lastname= this.tokenStorage.getLastname();
    if (this.tokenStorage.getToken()) {
      this.role = this.tokenStorage.getAuthority();
      if (this.role === 'ROLE_ADMIN') {
        this.authority = 'admin';
        return false;
      } else if (this.role === 'ROLE_PM') {
        this.authority = 'pm';
        return false;
      }
      this.authority = 'user';
      return true;
    }
    this.info = {
      token: this.tokenStorage.getToken(),
      username: this.tokenStorage.getUsername(),
      authorities: this.tokenStorage.getAuthority(),
      user_firstname: this.tokenStorage.getFirstname(),
      user_lastname: this.tokenStorage.getLastname()
    };
  }
  public getSubjects(): void {
    this.subjectService.getSubjects().subscribe(
      (response: Subject[]) => {
        this.subjects = response;
        console.log(this.subjects);

      },
      (error: HttpErrorResponse) => {
        // alert(error.message);
        if (error.status === 403) {
          window.location.assign("/forbidden");
        }else {
          window.location.assign("/error");
        }
        if (error.status === 401) {
          window.location.assign("/forbidden");
        }
      }
    );
  }
  public searchSubjects(keyWord: string): void {
    console.log(keyWord);
    const results: Subject[] = [];
    for (const subject of this.subjects) {
      if (subject.title.toLowerCase().indexOf(keyWord.toLowerCase()) !== -1){
        results.push(subject);
      }
    }
    this.subjects = results;
    if (results.length === 0 || !keyWord) {
      this.getSubjects();
    }
  }
  public onOpenModal(mode: string): void {
    const container = document.getElementById('main-container');
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-toggle', 'modal');
    if(mode === 'user'){
      button.setAttribute('data-target', '#infoUserModal');
    }
    // @ts-ignore
    container.appendChild(button);
    button.click();
  }
  logout() {
    this.tokenStorage.signOut();
    window.location.assign("/subjects/scheduled")
  }
  public getMarkTasksBySubject(subject_id:number):Task[]  {
    var tasks:Task[] = [];
    this.taskService.getTasksBySubject(this.user_id, String(subject_id)).subscribe(
      (response: Task[]) => {
        var tasks:Task[] = response;
        console.log(tasks);
      },
      (error: HttpErrorResponse) => {
        // alert(error.message);
        if (error.status === 403) {
          window.location.assign("/forbidden");
        }else {
          window.location.assign("/error");
        }
        if (error.status === 401) {
          window.location.assign("/forbidden");
        }
      }
    );
    return tasks;
  }
  getCourseMark(tasks:Task[]):number{
    var course_mark:number=0;
    for(let task of tasks){
      course_mark=course_mark+task.mark;}
    return course_mark;
  }
}
