import { Component } from '@angular/core';
import {ModalService} from "../add-task-modal/modal.service";

@Component({
  selector: 'app-done-task-modal',
  templateUrl: './done-task-modal.component.html',
  styleUrls: ['./done-task-modal.component.css']
})
export class DoneTaskModalComponent {
  constructor(private modalService: ModalService) {
  }
  close() {
    this.modalService.closeDone();
  }
}
