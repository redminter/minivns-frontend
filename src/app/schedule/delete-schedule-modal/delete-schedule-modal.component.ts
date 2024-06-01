import { Component } from '@angular/core';
import {ModalService} from "../../task/add-task-modal/modal.service";
import {HttpErrorResponse} from "@angular/common/http";
import {ActivatedRoute, Router} from "@angular/router";
import {DataTransferService} from "../../data-transfer.service";
import {TaskService} from "../../task/task.service";
import {TokenStorageService} from "../../auth/token-storage.service";
import {SubjectService} from "../../subject/subject.service";
import {Task} from "../../task/task";
import {Schedule} from "../schedule";
import {ScheduleService} from "../schedule.service";

@Component({
  selector: 'app-delete-modal',
  templateUrl: './delete-schedule-modal.component.html',
  styleUrls: ['./delete-schedule-modal.component.css']
})
export class DeleteScheduleModalComponent {
  // @ts-ignore
  user_id: string | null;
  // @ts-ignore
  subject_id: string | null;
  deleteSchedule: Schedule | null;
  constructor(private scheduleService:ScheduleService, private router: Router, private dataTransferService: DataTransferService, private taskService: TaskService, private activatedRoute: ActivatedRoute, private tokenStorage: TokenStorageService, subjectService:SubjectService, private modalService: ModalService) {
    this.user_id = this.dataTransferService.getUserId();
    this.subject_id = this.dataTransferService.getSubjectId();
    this.deleteSchedule = this.dataTransferService.getDeleteSchedule();

    console.log(this.user_id, this.subject_id, this.deleteSchedule);
  }
  close() {
    this.modalService.closeDeleteSchedule();
  }

  onDeleteSchedule(schedule_id: number | undefined): void {
    this.scheduleService.deleteSchedule(this.deleteSchedule?.id).subscribe(
      (response: void) => {
        console.log(response);
        this.modalService.closeDeleteSchedule();
        this.router.navigateByUrl('/dummny', {skipLocationChange: true}).then(() => {
          this.router.navigate(['/schedule']);
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
