import { Component } from '@angular/core';
import {ModalService} from "../add-task-modal/modal.service";
import {NgForm} from "@angular/forms";
import { Task } from '../task';
import {DataTransferService} from "../../data-transfer.service";
import {TaskService} from "../task.service";
import {HttpErrorResponse} from "@angular/common/http";

@Component({
  selector: 'app-done-task-modal',
  templateUrl: './done-task-modal.component.html',
  styleUrls: ['./done-task-modal.component.css']
})
export class DoneTaskModalComponent {
  // @ts-ignore
  doneTask: Task | null;
  constructor(private modalService: ModalService, private  dataTransferService: DataTransferService, private taskService: TaskService){
    this.doneTask = this.dataTransferService.getDoneTask();
  }
  close() {
    this.modalService.closeDone();
  }
  public onDoneTask(doneForm: NgForm): void {
    // @ts-ignore
    document.getElementById('done-task-form').click();
    let task: Task;
    task = doneForm.value;
    task.mark = doneForm.value.mark;
    task.is_done = true;
    let subject_id = this.doneTask?.subject_id;
    console.log(task, this.doneTask, String(subject_id?.id), this.dataTransferService.getUserId());
    this.taskService.updateTask(this.dataTransferService.getUserId(), String(subject_id?.id), this.doneTask?.id, task).subscribe(
      (response: Task) => {
        console.log(response);
        this.modalService.closeDone();
        window.location.reload();
      },
      (error: HttpErrorResponse) => {
         //alert(error.message);
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
}
