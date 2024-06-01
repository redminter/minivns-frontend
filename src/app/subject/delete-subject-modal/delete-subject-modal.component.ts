import { Component } from '@angular/core';
import {ModalService} from "../../task/add-task-modal/modal.service";
import {HttpErrorResponse} from "@angular/common/http";
import {Schedule} from "../../schedule/schedule";
import {DataTransferService} from "../../data-transfer.service";
import {ScheduleService} from "../../schedule/schedule.service";
import {Router} from "@angular/router";
import {SubjectService} from "../subject.service";
import {Subject} from "../subject";

@Component({
  selector: 'app-delete-subject-modal',
  templateUrl: './delete-subject-modal.component.html',
  styleUrls: ['./delete-subject-modal.component.css']
})
export class DeleteSubjectModalComponent {

  deleteSubject: Subject | null;
  constructor(private modalService: ModalService, dataTransferService: DataTransferService, private subjectService: SubjectService, private router: Router) {
    this.deleteSubject = dataTransferService.getDeleteSubject();
  }
  close() {
    this.modalService.closeDelete();
  }

  onDeleteSubject(subject_id: number | undefined): void {
    this.subjectService.deleteSubject(this.deleteSubject?.id).subscribe(
      (response: void) => {
        console.log(response);
        this.modalService.closeDeleteSubject();
        this.router.navigateByUrl('/dummny', {skipLocationChange: true}).then(() => {
          this.router.navigate(['/subjects']);
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
