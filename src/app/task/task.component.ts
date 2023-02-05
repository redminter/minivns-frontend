import { Component } from '@angular/core';
import {Subject} from "../Subject/subject";
import {HttpErrorResponse} from "@angular/common/http";
import {TaskService} from "./task.service";
import { Task } from './task';
import {ActivatedRoute} from "@angular/router";
import {NgForm} from "@angular/forms";

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent {
  public tasks: Task[] = [];
  // @ts-ignore
  user_id:string|null;
  // @ts-ignore
  subject_id:string|null;
  // @ts-ignore
  editTask: Task | null;
  // @ts-ignore
  deleteTask: Task | null;
  // @ts-ignore
  task: Task | null;

  constructor(private taskService: TaskService, private activatedRoute:ActivatedRoute) {
    this.subject_id=this.activatedRoute.snapshot.paramMap.get('subject_id');
    this.user_id=this.activatedRoute.snapshot.paramMap.get('user_id');
  }
  ngOnInit() {
    this.getTasksBySubject();
  }
  public getTasksBySubject(): void {

    this.taskService.getTasksBySubject(this.user_id, this.subject_id).subscribe(
      (response: Task[]) => {
        this.tasks = response;
        console.log(this.tasks);

      },
      (err: HttpErrorResponse) => {
        alert(err.message);
      });
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
        alert(error.message);
        addForm.reset();
      }
    );
  }
  public onUpdateTask(updateForm: NgForm, task_id:number|undefined): void {
    // @ts-ignore
    document.getElementById('update-task-form').click();
    this.taskService.updateTask(this.user_id, this.subject_id, task_id, updateForm.value).subscribe(
      (response: Subject) => {
        console.log(response);
        this.getTasksBySubject();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }
  public onDeleteTask( task_id:number|undefined): void {
    this.taskService.deleteTask(this.user_id, this.subject_id, task_id).subscribe(
      (response: void) => {
        console.log(response);
        this.getTasksBySubject();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }
  public searchTask(keyWord: string): void {
    console.log(keyWord);
    const results: Task[] = [];
    for (const task of this.tasks) {
      if (task.title.toLowerCase().indexOf(keyWord.toLowerCase()) !== -1){
        results.push(task);
      }
    }
    this.tasks = results;
    if (results.length === 0 || !keyWord) {
      this.getTasksBySubject();
    }
  }
  public onOpenModal(task: Task|null, mode: string): void {
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
    // @ts-ignore
    container.appendChild(button);
    button.click();
  }
}
