import { Component } from '@angular/core';
import {ModalService} from "../task/add-task-modal/modal.service";

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent {

  constructor(private modalService: ModalService) {
  }
  openModal(){
    this.modalService.openAddSubjectModule();
  }
}
