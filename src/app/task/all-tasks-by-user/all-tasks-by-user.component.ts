import {Component} from '@angular/core';
import {TaskService} from "../task.service";
import {ActivatedRoute} from "@angular/router";
import {HttpErrorResponse} from "@angular/common/http";
import {Task} from '../task';
import {TokenStorageService} from "../../auth/token-storage.service";
import {NgForm} from "@angular/forms";
import {Subject} from "../../Subject/subject";

@Component({
  selector: 'app-all-tasks-by-user',
  templateUrl: './all-tasks-by-user.component.html',
  styleUrls: ['./all-tasks-by-user.component.css']
})
export class AllTasksByUserComponent {
  public tasks: Task[] = [];
  // @ts-ignore
  user_id: string | null;
  // @ts-ignore
  doneTask: Task | null;
  // @ts-ignore
  authority: any;
  username: any;
  user_firstname: any;
  user_lastname: any;
  role: any;

  constructor(private taskService: TaskService, private activatedRoute: ActivatedRoute, private tokenStorage: TokenStorageService) {
    this.user_id = this.activatedRoute.snapshot.paramMap.get('user_id');
  }

  // @ts-ignore
  ngOnInit() {
    this.getTasksByUser();
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

  public getDate(task: Task): String {
    const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    let date = new Date(task.deadline);
    return String(date.getDate()) + " " + monthNames[date.getMonth()];

  }

  public getTasksByUser(): void {

    this.taskService.getTasksByUser(this.user_id).subscribe(
      (response: Task[]) => {
        this.tasks = response;
        console.log(this.tasks);

      },
      (error: HttpErrorResponse) => {
        //alert(error.message);
        if (error.status === 403) {
          window.location.assign("/forbidden");
        } else {
          window.location.assign("/error");
        }
      }
    );
  }

  public searchTasks(keyWord: string): void {
    console.log(keyWord);
    const results: Task[] = [];
    for (const task of this.tasks) {
      if (task.title.toLowerCase().indexOf(keyWord.toLowerCase()) !== -1) {
        results.push(task);
      }
    }
    this.tasks = results;
    if (results.length === 0 || !keyWord) {
      this.getTasksByUser();
    }
  }

  public onDoneTask(doneForm: NgForm, task_id: number | undefined): void {
    // @ts-ignore
    document.getElementById('done-task-form').click();
    let task: Task;
    task = doneForm.value;
    task.is_done = true;
    let subject_id = task.subject_id;
    this.taskService.updateTask(this.user_id, String(subject_id), task_id, task).subscribe(
      (response: Subject) => {
        console.log(response);
        this.getTasksByUser();
      },
      (error: HttpErrorResponse) => {
        //alert(error.message);
        if (error.status === 403) {
          window.location.assign("/forbidden");
        } else {
          window.location.assign("/error");
        }
      }
    );
  }

  public onUndoneTask(doneForm: NgForm, task_id: number | undefined): void {
    // @ts-ignore
    document.getElementById('done-task-form').click();
    let task: Task;
    task = doneForm.value;
    let subject_id = task.subject_id;
    task.is_done = false;
    this.taskService.updateTask(this.user_id, String(subject_id), task_id, task).subscribe(
      (response: Subject) => {
        console.log(response);
        this.getTasksByUser();
      },
      (error: HttpErrorResponse) => {
        //alert(error.message);
        if (error.status === 403) {
          window.location.assign("/forbidden");
        } else {
          window.location.assign("/error");
        }
      }
    );
  }

  public onOpenModal(task: Task | null, mode: string): void {
    const container = document.getElementById('main-container');
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-toggle', 'modal');
    // if (mode === 'add') {
    //   button.setAttribute('data-target', '#addTaskModal');
    // }
    // // if (mode === 'edit') {
    // //   this.editTask = task;
    // //   button.setAttribute('data-target', '#updateTaskModal');
    // // }
    // // if (mode === 'delete') {
    // //   this.deleteTask = task;
    // //   button.setAttribute('data-target', '#deleteTaskModal');
    // // }
    if (mode === 'user') {
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
