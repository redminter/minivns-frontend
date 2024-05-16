import { Component } from '@angular/core';
import {ModalService} from "../add-task-modal/modal.service";

@Component({
  selector: 'app-delete-modal',
  templateUrl: './delete-modal.component.html',
  styleUrls: ['./delete-modal.component.css']
})
export class DeleteModalComponent {
  constructor(private modalService: ModalService) {
  }
  close() {
    this.modalService.closeDelete();
  }
}
