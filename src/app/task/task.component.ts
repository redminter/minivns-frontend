import {Component} from '@angular/core';
import {Subject} from "../Subject/subject";
import {HttpErrorResponse} from "@angular/common/http";
import {TaskService} from "./task.service";
import {Task} from './task';
import {ActivatedRoute} from "@angular/router";
import {NgForm} from "@angular/forms";
import {TokenStorageService} from "../auth/token-storage.service";
import {parseJson} from "@angular/cli/src/utilities/json-file";

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
  // @ts-ignore
  currentDate:Date;
  constructor(private taskService: TaskService, private activatedRoute: ActivatedRoute, private tokenStorage: TokenStorageService) {
    this.subject_id = this.activatedRoute.snapshot.paramMap.get('subject_id');
    this.user_id = this.activatedRoute.snapshot.paramMap.get('user_id');
    this.currentDate = new Date();
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

  public getDateString(task: Task): String {
    const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    let date = new Date(task.deadline);
    return String(date.getDate()) + " " + monthNames[date.getMonth()];

  }
  public getDate(task: Task): Date {
    const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    let date = new Date(task.deadline);
    return date;

  }

  public getTasksBySubject(): void {

    this.taskService.getTasksBySubject(this.user_id, this.subject_id).subscribe(
      (response: Task[]) => {
        this.tasks = response;
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

  public onAddTask(addForm: NgForm): void {
    let task = addForm.value;
    // @ts-ignore
    document.getElementById('add-task-form').click();
    this.taskService.addTask(this.user_id, this.subject_id, task).subscribe(
      (response: Task) => {
        console.log(response);
        this.getTasksBySubject();
        addForm.reset();
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

  public onUpdateTask(updateForm: NgForm, task_id: number | undefined): void {
    // @ts-ignore
    document.getElementById('update-task-form').click();
    let task=updateForm.value;
    task.is_done=this.editTask?.is_done;
    this.taskService.updateTask(this.user_id, this.subject_id, task_id, updateForm.value).subscribe(
      (response: Subject) => {
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

  public onDoneTask(doneForm: NgForm, task_id: number | undefined): void {
    // @ts-ignore
    document.getElementById('done-task-form').click();
    let task:Task;
    task=doneForm.value;
    task.is_done=true;
    this.taskService.updateTask(this.user_id, this.subject_id, task_id, task).subscribe(
      (response: Subject) => {
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
  public onUndoneTask(doneForm: NgForm, task_id: number | undefined): void {
    // @ts-ignore
    document.getElementById('done-task-form').click();
    let task:Task;
    task=doneForm.value;
    task.is_done=false;
    this.taskService.updateTask(this.user_id, this.subject_id, task_id, task).subscribe(
      (response: Subject) => {
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
      this.editTask = task;
      button.setAttribute('data-target', '#updateTaskModal');
    }
    if (mode === 'delete') {
      this.deleteTask = task;
      button.setAttribute('data-target', '#deleteTaskModal');
    }
    if (mode === 'user') {
      this.deleteTask = task;
      button.setAttribute('data-target', '#infoUserModal');
    }
    if (mode === 'done') {
      this.doneTask = task;
      button.setAttribute('data-target', '#doneTaskModal');
    }
    if (mode === 'undone') {
      this.doneTask = task;
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
