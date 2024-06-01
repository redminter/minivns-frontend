import {Component} from '@angular/core';
import {Subject} from "../subject/subject";
import {HttpErrorResponse} from "@angular/common/http";
import {TaskService} from "./task.service";
import {Task} from './task';
import {ActivatedRoute} from "@angular/router";
import {NgForm} from "@angular/forms";
import {TokenStorageService} from "../auth/token-storage.service";
import {parseJson} from "@angular/cli/src/utilities/json-file";
import {SubjectService} from "../subject/subject.service";
import {ModalService} from "./add-task-modal/modal.service";
import {DataTransferService} from "../data-transfer.service";

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent {
  public tasks: Task[] = [];
  // @ts-ignore
  user_id: string | null;
  // @ts-ignore
  subject_id: string | null;
  // @ts-ignore
  editTask: Task | null;
  // @ts-ignore
  deleteTask: Task | null;
  // @ts-ignore
  doneTask: Task | null;
  // @ts-ignore
  authority: any;
  username: any;
  user_firstname: any;
  user_lastname: any;
  role: any;
  subject_name:any;
  course_mark:number=0;
  // @ts-ignore
  currentDate:Date;
  constructor(private dataTransferService: DataTransferService, private modalService: ModalService, private taskService: TaskService, private activatedRoute: ActivatedRoute, private tokenStorage: TokenStorageService, subjectService:SubjectService) {
    this.subject_id = this.activatedRoute.snapshot.paramMap.get('subject_id');
    subjectService.getOneSubject(this.subject_id).subscribe(res =>{
      console.log(res);
      this.subject_name=res;
    });
    this.user_id = this.activatedRoute.snapshot.paramMap.get('user_id');
    this.currentDate = new Date();

    this.dataTransferService.setUserId(this.user_id);
    this.dataTransferService.setSubjectId(this.subject_id);
  }

  // @ts-ignore
  ngOnInit() {
    this.getTasksBySubject();

    this.username = this.tokenStorage.getUsername();
    this.authority = this.tokenStorage.getAuthority();
    this.user_firstname = this.tokenStorage.getFirstname();
    this.user_lastname = this.tokenStorage.getLastname();
    if (this.tokenStorage.getToken()) {
      this.role = this.tokenStorage.getAuthority();
      if (this.role === 'ROLE_ADMIN') {
        this.authority = 'admin';
        return false;
      }
      this.authority = 'user';
      return true;
    }
  }
  openModal(mode: string) {
    switch (mode) {
      case 'add':
        this.modalService.openAddModule();
        break;
      case 'edit':
        this.modalService.openEditModule();
        break;
      case 'done':
        this.modalService.openDoneModule();
        break;
    }
  }
  public getDateString(task: Task): String {
    const monthNames = ["Січня", "Лютого", "Березня", "Квітня", "Травня", "Червня", "Липня", "Серпня", "Вересня", "Жовтня", "Листопада", "Грудня"];
    let date = new Date(task.deadline);
    return String(date.getDate()) + " " + monthNames[date.getMonth()];

  }
  public getDoneDate(task: Task): Date {
    let date = new Date(task.done_date);
    return date;

  }
  public getDoneDateString(task: Task|null): String {
    const monthNames = ["Січня", "Лютого", "Березня", "Квітня", "Травня", "Червня", "Липня", "Серпня", "Вересня", "Жовтня", "Листопада", "Грудня"];
    let another_task = <Task>task;
    let date = new Date(another_task?.done_date);
    return String(date.getDate()) + " " + monthNames[date.getMonth()]+" "+String(date.getHours()+2)+":"+date.getMinutes();

  }
  public getDate(task: Task): Date {
    const monthNames = ["Січня", "Лютого", "Березня", "Квітня", "Травня", "Червня", "Липня", "Серпня", "Вересня", "Жовтня", "Листопада", "Грудня"];
    let date = new Date(task.deadline);
    return date;

  }

  public getTasksBySubject(): void {

    this.taskService.getTasksBySubject(this.user_id, this.subject_id).subscribe(
      (response: Task[]) => {
        this.tasks = response;
          this.course_mark=this.tasks.flatMap(x=>x.mark).reduce((sum, current)=>sum+current);

        console.log(this.tasks);

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
  public onDeleteTask(task_id: number | undefined): void {
    this.taskService.deleteTask(this.user_id, this.subject_id, task_id).subscribe(
      (response: void) => {
        console.log(response);
        this.getTasksBySubject();
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

  public searchTask(keyWord: string): void {
    console.log(keyWord);
    const results: Task[] = [];
    for (const task of this.tasks) {
      if (task.title.toLowerCase().indexOf(keyWord.toLowerCase()) !== -1) {
        results.push(task);
      }
    }
    this.tasks = results;
    if (results.length === 0 || !keyWord) {
      this.getTasksBySubject();
    }
  }

  public onOpenModal(task: Task | null, mode: string): void {
    const container = document.getElementById('main-container');
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-toggle', 'modal');
    if (mode === 'add') {
      button.setAttribute('data-target', '#addTaskModal');
    }
    if (mode === 'edit') {
      this.dataTransferService.setEditTask(task);
      this.dataTransferService.setDeleteTask(task);
      this.modalService.openEditModule();
      button.setAttribute('data-target', '#updateTaskModal');

    }
    if (mode === 'delete') {
      this.modalService.openDeleteModule();
      button.setAttribute('data-target', '#deleteTaskModal');
    }
    if (mode === 'user') {
      this.deleteTask = task;
      button.setAttribute('data-target', '#infoUserModal');
    }
    if (mode === 'done') {
      this.doneTask = <Task>task;
      this.dataTransferService.setDoneTask(task);
      this.dataTransferService.setUserId(this.user_id);
      this.modalService.openDoneModule();
      button.setAttribute('data-target', '#doneTaskModal');
    }
    if (mode === 'undone') {
      this.dataTransferService.setUnDoneTask(task);
      this.modalService.openUnDoneModule();
      this.doneTask = <Task>task;
      button.setAttribute('data-target', '#undoneTaskModal');
    }
    // @ts-ignore
    container.appendChild(button);
    button.click();
  }

  logout() {
    this.tokenStorage.signOut();
    window.location.assign("/subjects/scheduled")
  }
}
