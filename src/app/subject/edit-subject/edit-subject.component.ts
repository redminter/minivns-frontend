import { Component } from '@angular/core';
import {ModalService} from "../../task/add-task-modal/modal.service";
import {NgForm} from "@angular/forms";
import {Subject} from "../subject";
import {HttpErrorResponse} from "@angular/common/http";
import {DataTransferService} from "../../data-transfer.service";
import {SubjectService} from "../subject.service";
import {ActivatedRoute, Router} from "@angular/router";
import {TokenStorageService} from "../../auth/token-storage.service";




@Component({
  selector: 'app-edit-subject',
  templateUrl: './edit-subject.component.html',
  styleUrls: ['./edit-subject.component.css']
})
export class EditSubjectComponent {

  editSubject: Subject | null;
  constructor(private modalService: ModalService, private dataTransferService: DataTransferService, private subjectService: SubjectService, private activatedRoute: ActivatedRoute, private tokenStorage: TokenStorageService, private router: Router) {
    this.editSubject = this.dataTransferService.getEditSubject();
    console.log(this.editSubject);

  }
  close() {
    this.modalService.closeEditSubject();
  }
  openDelete() {
    this.modalService.closeEditSubject();
    this.modalService.openDeleteSubjectModule();
  }

  public onEditSubject(updateForm: NgForm, subject_id: number | undefined): void {
    // @ts-ignore
    document.getElementById('edit-subject-form').click();
    let subject=updateForm.value;
    subject.id=this.editSubject?.id;
    this.subjectService.updateSubject(subject_id, subject).subscribe(
      (response: Subject) => {
        console.log(response);
        this.modalService.closeEditSubject();

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
