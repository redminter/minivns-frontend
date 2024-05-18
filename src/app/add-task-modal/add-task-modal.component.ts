import {Component, ElementRef, ViewChild} from '@angular/core';
import { ModalService } from "./modal.service";
import {NgForm} from "@angular/forms";
import {Task} from "../task/task";
import {HttpErrorResponse} from "@angular/common/http";
import {TaskService} from "../task/task.service";
import {ActivatedRoute, Router} from "@angular/router";
import {TokenStorageService} from "../auth/token-storage.service";
import {SubjectService} from "../Subject/subject.service";
import {DataTransferService} from "../data-transfer.service";

@Component({
  selector: 'app-add-task-modal',
  templateUrl: './add-task-modal.component.html',
})
export class AddTaskModalComponent {
  // @ts-ignore
  user_id: string | null;
  // @ts-ignore
  subject_id: string | null;

  constructor(private router: Router, private dataTransferService: DataTransferService, private taskService: TaskService, private activatedRoute: ActivatedRoute, private tokenStorage: TokenStorageService, subjectService:SubjectService, private modalService: ModalService) {
    this.user_id = this.dataTransferService.getUserId();
    this.subject_id = this.dataTransferService.getSubjectId();
    console.log(this.user_id, this.subject_id);

  }

  close() {
    this.modalService.closeAdd();
  }


  public onAddTask(addForm: NgForm): void {
    let task = addForm.value;
    console.log(addForm.value);
    console.log(task);
    // @ts-ignore
    document.getElementById('add-task-form').click();

    this.taskService.addTask(this.user_id, this.subject_id, task).subscribe(
      (response: Task) => {
        console.log(response);
        addForm.reset();
        this.modalService.closeAdd();

        this.router.navigateByUrl('/dummny', {skipLocationChange: true}).then(() => {
          this.router.navigate(['/users/'+this.user_id+'/subjects/'+this.subject_id+'/tasks']);
        });

      },
      (error: HttpErrorResponse) => {
        alert(error.message);
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
