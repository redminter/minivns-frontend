import { Component } from '@angular/core';
import {Subject} from "../../subject/subject";
import {ModalService} from "../../task/add-task-modal/modal.service";
import {SubjectService} from "../../subject/subject.service";
import {ScheduleService} from "../schedule.service";
import {HttpErrorResponse} from "@angular/common/http";
import {Schedule} from "../schedule";
import {NgForm} from "@angular/forms";
import {Task} from "../../task/task";
import {DataTransferService} from "../../data-transfer.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-update-schedule-item-modal',
  templateUrl: './update-schedule-item-modal.component.html',
  styleUrls: ['./update-schedule-item-modal.component.css']
})
export class UpdateScheduleItemModalComponent {
  public subjects: Subject[] = [];

  editSchedule: Schedule | null;
  constructor(private router: Router,private dataTransferService: DataTransferService, private modalService: ModalService, private subjectService: SubjectService, private scheduleService: ScheduleService){
    this.editSchedule = this.dataTransferService.getEditSchedule();
  }

  ngOnInit() {
    this.getSubjects();
  }

  public getSubjects(): void {
    this.subjectService.getSubjects().subscribe(
      (response: Subject[]) => {
        this.subjects = response;
        console.log(this.subjects);
      },
      (error: HttpErrorResponse) => {
        //alert(error.message);
        if (error.status === 403) {
          window.location.assign("/forbidden");
        } else {
          window.location.assign("/error");
        }
        if (error.status === 401) {
          window.location.assign("/forbidden");
        }
      }
    );
  }

  close() {
    this.modalService.closeEditSchedule();
  }
  openDelete() {
    this.modalService.closeEditSchedule();
    this.modalService.openDeleteScheduleModule();
  }
public onUpdateSchedule(updateForm: NgForm): void {
    let subject = updateForm.value;
    console.log(updateForm.value);
    console.log(subject);
    // @ts-ignore
    document.getElementById('update-schedule-item-form').click();

    this.scheduleService.updateSchedule(this.editSchedule?.id, updateForm.value).subscribe(
      (response: Schedule) => {
        console.log(response);
        this.modalService.closeEditSchedule();
        this.router.navigateByUrl('/dummny', {skipLocationChange: true}).then(() => {
          this.router.navigate(['/schedule']);
        });
      },
      (error: HttpErrorResponse) => {
        //alert(error.message);
        if (error.status === 403) {
          window.location.assign("/forbidden");
        } else {
          window.location.assign("/error");
        }
        if (error.status === 401) {
          window.location.assign("/forbidden");
        }
      }
    );
  }
}
