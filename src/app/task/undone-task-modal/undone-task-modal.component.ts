import { Component } from '@angular/core';
import {HttpErrorResponse} from "@angular/common/http";
import { Task } from '../task';
import {NgForm} from "@angular/forms";
import {ModalService} from "../add-task-modal/modal.service";
import {DataTransferService} from "../../data-transfer.service";
import {TaskService} from "../task.service";

@Component({
  selector: 'app-undone-task-modal',
  templateUrl: './undone-task-modal.component.html',
  styleUrls: ['./undone-task-modal.component.css']
})
export class UndoneTaskModalComponent {
// @ts-ignore
  undoneTask: Task | null;
  constructor(private modalService: ModalService, private  dataTransferService: DataTransferService, private taskService: TaskService){
    this.undoneTask = this.dataTransferService.getUnDoneTask();
  }
  close() {
    this.modalService.closeDone();
  }
  public onUndoneTask(doneForm: NgForm): void {
    // @ts-ignore
    document.getElementById('undone-task-form').click();
    let task: Task;
    task = doneForm.value;
    task.mark = 0;
    task.max_mark=0;
    task.is_done = false;
    let subject_id = this.undoneTask?.subject_id;
    console.log(task, this.undoneTask, String(subject_id?.id), this.dataTransferService.getUserId());
    this.taskService.updateTask(this.dataTransferService.getUserId(), String(subject_id?.id), this.undoneTask?.id, task).subscribe(
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
