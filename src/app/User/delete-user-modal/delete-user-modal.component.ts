import { Component } from '@angular/core';
import {DataTransferService} from "../../data-transfer.service";
import {UserService} from "../user.service";
import {ModalService} from "../../task/add-task-modal/modal.service";

@Component({
  selector: 'app-delete-user-modal',
  templateUrl: './delete-user-modal.component.html',
  styleUrls: ['./delete-user-modal.component.css']
})
export class DeleteUserModalComponent {

  deleteUserId = this.dataTransfer.getDeleteUser();
  constructor(private modalService: ModalService, private userService: UserService, private dataTransfer: DataTransferService) { }

  close() {
     this.modalService.closeDeleteUser();
  }

  public onDeleteUser(): void {
    console.log(this.deleteUserId);
    this.userService.deleteUser(this.deleteUserId?.user_id).subscribe(
      (response: any) => {
        console.log(response);
        this.modalService.closeDeleteUser();
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
