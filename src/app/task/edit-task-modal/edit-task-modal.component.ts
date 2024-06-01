import { Component } from '@angular/core';
import {ModalService} from "../add-task-modal/modal.service";
import {NgForm} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {DataTransferService} from "../../data-transfer.service";
import {TaskService} from "../task.service";
import {TokenStorageService} from "../../auth/token-storage.service";
import {SubjectService} from "../../subject/subject.service";
import {Subject} from "../../subject/subject";
import {HttpErrorResponse} from "@angular/common/http";
import { Task } from '../task';

@Component({
  selector: 'app-edit-task-modal',
  templateUrl: './edit-task-modal.component.html',
  styleUrls: ['./edit-task-modal.component.css']
})
export class EditTaskModalComponent {
  // @ts-ignore
  user_id: string | null;
  // @ts-ignore
  subject_id: string | null;
  editTask: Task | null;
  constructor(private router: Router, private dataTransferService: DataTransferService, private taskService: TaskService, private activatedRoute: ActivatedRoute, private tokenStorage: TokenStorageService, subjectService:SubjectService, private modalService: ModalService) {
    this.user_id = this.dataTransferService.getUserId();
    this.subject_id = this.dataTransferService.getSubjectId();
    this.editTask = this.dataTransferService.getEditTask();
    console.log(this.user_id, this.subject_id);
  }

  close() {
    this.modalService.closeEdit();
  }
  openDelete() {
    this.modalService.closeEdit();
    this.modalService.openDeleteModule();
  }

  public onUpdateTask(updateForm: NgForm, task_id: number | undefined): void {
    // @ts-ignore
    document.getElementById('update-task-form').click();
    let task=updateForm.value;
    task.is_done=this.editTask?.is_done;
    this.taskService.updateTask(this.user_id, this.subject_id, task_id, updateForm.value).subscribe(
      (response: Task) => {
        console.log(response);
        this.modalService.closeEdit();

        this.router.navigateByUrl('/dummny', {skipLocationChange: true}).then(() => {
          this.router.navigate(['/users/'+this.user_id+'/subjects/'+this.subject_id+'/tasks']);
        });
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
