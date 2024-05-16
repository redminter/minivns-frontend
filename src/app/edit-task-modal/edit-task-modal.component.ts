import { Component } from '@angular/core';
import {ModalService} from "../add-task-modal/modal.service";

@Component({
  selector: 'app-edit-task-modal',
  templateUrl: './edit-task-modal.component.html',
  styleUrls: ['./edit-task-modal.component.css']
})
export class EditTaskModalComponent {
  constructor(private modalService: ModalService) {
  }

  close() {
    this.modalService.closeEdit();
  }
  openDelete() {
    this.modalService.closeEdit();
    this.modalService.openDeleteModule();
  }
}
