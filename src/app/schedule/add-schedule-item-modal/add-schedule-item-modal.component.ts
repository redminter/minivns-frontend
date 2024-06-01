import { Component } from '@angular/core';
import {ModalService} from "../../task/add-task-modal/modal.service";
import {SubjectService} from "../../subject/subject.service";
import {Subject} from "../../subject/subject";
import {HttpErrorResponse} from "@angular/common/http";
import {NgForm} from "@angular/forms";
import {Task} from "../../task/task";
import {ScheduleService} from "../schedule.service";
import {Schedule} from "../schedule";
import {Router} from "@angular/router";

@Component({
  selector: 'app-add-schedule-item-modal',
  templateUrl: './add-schedule-item-modal.component.html',
  styleUrls: ['./add-schedule-item-modal.component.css']
})
export class AddScheduleItemModalComponent {
  public subjects: Subject[] = [];
  constructor(private router:Router, private modalService: ModalService, private subjectService: SubjectService, private scheduleService: ScheduleService){
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
        }else {
          window.location.assign("/error");
        }
        if (error.status === 401) {
          window.location.assign("/forbidden");
        }
      }
    );
  }

  close() {
    this.modalService.closeAddSchedule();
  }

  public onAddSchedule(addForm: NgForm): void {
    let subject = addForm.value;
    console.log(addForm.value);
    console.log(subject);
    // @ts-ignore
    document.getElementById('add-schedule-item-form').click();

    this.scheduleService.addSchedule(addForm.value).subscribe(
      (response: Schedule) => {
        console.log(response);
        addForm.reset();
        this.modalService.closeAddSchedule();
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
