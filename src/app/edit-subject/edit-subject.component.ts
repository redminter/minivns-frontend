import { Component } from '@angular/core';
import {ModalService} from "../add-task-modal/modal.service";

@Component({
  selector: 'app-edit-subject',
  templateUrl: './edit-subject.component.html',
  styleUrls: ['./edit-subject.component.css']
})
export class EditSubjectComponent {
  constructor(private modalService: ModalService) {
  }
  close() {
    this.modalService.closeEditSubject();
  }
  openDelete() {
    this.modalService.closeEditSubject();
    this.modalService.openDeleteModule();
  }
}
