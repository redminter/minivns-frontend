import {Component, OnInit} from '@angular/core';
import {HttpErrorResponse} from "@angular/common/http";
import {NgForm} from "@angular/forms";
import {User} from "./user";
import {UserService} from "./user.service";

@Component({
  templateUrl: './user.component.html'
})
export class UserComponent implements OnInit{
  public users: User[] = [];
  // @ts-ignore
  public editUser: User | null;
  // @ts-ignore
  public deleteUser: User | null;
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
  public onUpdateUser(updateForm: NgForm, userId:number|undefined): void {
    // @ts-ignore
    document.getElementById('update-user-form').click();
    this.userService.updateUser(userId, updateForm.value).subscribe(
      (response: User) => {
        console.log(response);
        this.getUsers();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }
  public onDeleteUser( userId:number|undefined): void {
    this.userService.deleteUser(userId).subscribe(
      (response: void) => {
        console.log(response);
        this.getUsers();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }
  public searchUsers(keyWord: string): void {
    console.log(keyWord);
    const results: User[] = [];
    for (const user of this.users) {
      if (user.first_name.toLowerCase().indexOf(keyWord.toLowerCase()) !== -1
        || user.email.toLowerCase().indexOf(keyWord.toLowerCase()) !== -1
        || user.last_name.toLowerCase().indexOf(keyWord.toLowerCase()) !== -1) {
        results.push(user);
      }
    }
    this.users = results;
    if (results.length === 0 || !keyWord) {
      this.getUsers();
    }
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
      this.editUser = user;
      button.setAttribute('data-target', '#updateUserModal');
    }
    if (mode === 'delete') {
      this.deleteUser = user;
      button.setAttribute('data-target', '#deleteUserModal');
    }
    // @ts-ignore
    container.appendChild(button);
    button.click();
  }
}
