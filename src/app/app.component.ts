import {Component, OnInit} from '@angular/core';
import {User} from "./user";
import {HttpErrorResponse} from "@angular/common/http";
import {UserService} from "./user.service";
import {NgForm} from "@angular/forms";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'minivns';
  public users: User[] = [];
  constructor(private userService: UserService) {
  }
  ngOnInit() {
    this.getUsers();
  }
  public getUsers(): void {
    this.userService.getUsers().subscribe(
      (response: User[]) => {
        this.users = response;
        console.log(this.users);

      },
      (err: HttpErrorResponse) => {
        alert(err.message);
      });
  }
  public onAddUser(addForm: NgForm): void {
    // @ts-ignore
    document.getElementById('add-user-form').click();
    this.userService.addUser(addForm.value).subscribe(
      (response: User) => {
        console.log(response);
        this.getUsers();
        addForm.reset();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
        addForm.reset();
      }
    );
  }

  public onOpenModal(user: User|null, mode: string): void {
    const container = document.getElementById('main-container');
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-toggle', 'modal');
    if (mode === 'add') {
      button.setAttribute('data-target', '#addUserModal');
    }
    if (mode === 'edit') {
      button.setAttribute('data-target', '#addUserModal');
    }
    if (mode === 'delete') {
      // this.deleteEmployee = employee;
      button.setAttribute('data-target', '#addUserModal');
    }
    // @ts-ignore
    container.appendChild(button);
    button.click();
  }
}
