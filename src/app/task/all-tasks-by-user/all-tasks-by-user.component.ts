import { Component } from '@angular/core';
import {TaskService} from "../task.service";
import {ActivatedRoute} from "@angular/router";
import {HttpErrorResponse} from "@angular/common/http";
import { Task } from '../task';

@Component({
  selector: 'app-all-tasks-by-user',
  templateUrl: './all-tasks-by-user.component.html',
  styleUrls: ['./all-tasks-by-user.component.css']
})
export class AllTasksByUserComponent {
  public tasks: Task[] = [];
  // @ts-ignore
  user_id:string|null;
  // @ts-ignore

  constructor(private taskService: TaskService, private activatedRoute:ActivatedRoute) {
    this.user_id=this.activatedRoute.snapshot.paramMap.get('user_id');
  }
  ngOnInit() {
    this.getTasksByUser();
  }
  public getTasksByUser(): void {

    this.taskService.getTasksByUser(this.user_id).subscribe(
      (response: Task[]) => {
        this.tasks = response;
        console.log(this.tasks);

      },
      (err: HttpErrorResponse) => {
        alert(err.message);
      });
  }
  public searchTasks(keyWord: string): void {
    console.log(keyWord);
    const results: Task[] = [];
    for (const task of this.tasks) {
      if (task.title.toLowerCase().indexOf(keyWord.toLowerCase()) !== -1){
        results.push(task);
      }
    }
    this.tasks = results;
    if (results.length === 0 || !keyWord) {
      this.getTasksByUser();
    }
  }
}
