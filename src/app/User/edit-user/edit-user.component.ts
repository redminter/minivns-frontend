import { Component } from '@angular/core';
import {DataTransferService} from "../../data-transfer.service";
import {UserService} from "../user.service";
import {ModalService} from "../../task/add-task-modal/modal.service";
import {NgForm} from "@angular/forms";

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent {

  editUser = this.dataTransfer.getEditUser();
  constructor(private dataTransfer:DataTransferService, private userService: UserService, private modalService: ModalService) {
  }
  ngOnInit(): void {
  }

  close(){
    this.modalService.closeEditUser();
  }
  openDelete(){
    this.modalService.closeEditUser();
    this.modalService.openDeleteUserModule();
}
  onEditUser(editForm: NgForm): void {
    console.log(editForm.value);
    let user = editForm.value;
    this.userService.updateUser(this.editUser?.user_id, user).subscribe(
      (response: any) => {
        console.log(response);
        this.modalService.closeEditUser();
        window.location.reload();
      },
      (error: any) => {
        console.log(error);
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
