import { Component } from '@angular/core';
import {ModalService} from "../../task/add-task-modal/modal.service";
import {SubjectService} from "../../subject/subject.service";
import {Router} from "@angular/router";
import {User} from "../user";
import {UserComponent} from "../user.component";
import {UserService} from "../user.service";
import {NgForm} from "@angular/forms";

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent {

  constructor(private modalService:ModalService, private userService: UserService,private router: Router) { }

  ngOnInit(): void {
  }
  close() {
    this.modalService.closeAddUser();
  }

  public onAddUser(addForm: NgForm): void {
    console.log(addForm.value);
    let user:User=addForm.value;
    this.userService.addUser(user).subscribe(
      (response: User) => {
        console.log(response);
        this.router.navigateByUrl('/dummny', {skipLocationChange: true}).then(() => {
          this.router.navigate(['/users']);
        });
        this.modalService.closeAddUser();
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
