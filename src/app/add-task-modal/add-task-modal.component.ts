import {Component, ElementRef, ViewChild} from '@angular/core';
import { ModalService } from "./modal.service";

@Component({
  selector: 'app-add-task-modal',
  templateUrl: './add-task-modal.component.html',
})
export class AddTaskModalComponent {
  constructor(private modalService: ModalService) { }

  close() {
    this.modalService.closeAdd();
  }


}
