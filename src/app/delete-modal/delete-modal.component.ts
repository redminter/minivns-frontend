import { Component } from '@angular/core';
import {ModalService} from "../add-task-modal/modal.service";
import {HttpErrorResponse} from "@angular/common/http";
import {ActivatedRoute, Router} from "@angular/router";
import {DataTransferService} from "../data-transfer.service";
import {TaskService} from "../task/task.service";
import {TokenStorageService} from "../auth/token-storage.service";
import {SubjectService} from "../Subject/subject.service";
import {Task} from "../task/task";

@Component({
  selector: 'app-delete-modal',
  templateUrl: './delete-modal.component.html',
  styleUrls: ['./delete-modal.component.css']
})
export class DeleteModalComponent {
  // @ts-ignore
  user_id: string | null;
  // @ts-ignore
  subject_id: string | null;
  deleteTask: Task | null;
  constructor(private router: Router, private dataTransferService: DataTransferService, private taskService: TaskService, private activatedRoute: ActivatedRoute, private tokenStorage: TokenStorageService, subjectService:SubjectService, private modalService: ModalService) {
    this.user_id = this.dataTransferService.getUserId();
    this.subject_id = this.dataTransferService.getSubjectId();
    this.deleteTask = this.dataTransferService.getDeleteTask();
    console.log(this.user_id, this.subject_id);
  }
  close() {
    this.modalService.closeDelete();
  }
  public onDeleteTask(task_id: number | undefined): void {
    this.taskService.deleteTask(this.user_id, this.subject_id, task_id).subscribe(
      (response: void) => {
        console.log(response);
          this.modalService.closeDelete();
        this.router.navigateByUrl('/dummny', {skipLocationChange: true}).then(() => {
          this.router.navigate(['/users/'+this.user_id+'/subjects/'+this.subject_id+'/tasks']);
        });

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
}
