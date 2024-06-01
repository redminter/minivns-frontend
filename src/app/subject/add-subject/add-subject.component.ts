import { Component } from '@angular/core';
import {ModalService} from "../../task/add-task-modal/modal.service";
import {NgForm} from "@angular/forms";
import {Task} from "../../task/task";
import {HttpErrorResponse} from "@angular/common/http";
import {SubjectService} from "../subject.service";
import {Router} from "@angular/router";
import {Schedule} from "../../schedule/schedule";
import {Subject} from "../subject";

@Component({
  selector: 'app-add-subject',
  templateUrl: './add-subject.component.html',
  styleUrls: ['./add-subject.component.css']
})
export class AddSubjectComponent {

  constructor(private modalService: ModalService, private subjectService: SubjectService, private router: Router){}
  close() {
    this.modalService.closeAddSubject();
  }
  public onAddSubjects(addForm: NgForm): void {
    let subject = addForm.value;
    console.log(addForm.value);
    console.log(subject);
    // @ts-ignore
    document.getElementById('add-subject-form').click();

    this.subjectService.addSubject(addForm.value).subscribe(
      (response: Subject) => {
        console.log(response);
        addForm.reset();
        this.modalService.closeAddSubject();
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
