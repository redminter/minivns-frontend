import { Component } from '@angular/core';
import {TaskService} from "../task/task.service";
import {ActivatedRoute} from "@angular/router";
import {TokenStorageService} from "../auth/token-storage.service";
import {SubjectService} from "../Subject/subject.service";

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {

  // @ts-ignore
  user_id:number;
  // @ts-ignore
  role: string;
  // @ts-ignore
  authority: string;
  info: any;
  user_firstname:any;
  user_lastname:any;
  username:any;
  constructor(private tokenStorage: TokenStorageService) {
  }

  // @ts-ignore
  ngOnInit() {
    this.user_id=this.tokenStorage.getId();
    this.username= this.tokenStorage.getUsername();
    this.authority=this.tokenStorage.getAuthority();
    this.user_firstname=this.tokenStorage.getFirstname();
    this.user_lastname= this.tokenStorage.getLastname();
    if (this.tokenStorage.getToken()) {
      this.role = this.tokenStorage.getAuthority();
      if (this.role === 'ROLE_ADMIN') {
        this.authority = 'admin';
        return false;
      } else if (this.role === 'ROLE_PM') {
        this.authority = 'pm';
        return false;
      }
      this.authority = 'user';
      return true;
    }
    this.info = {
      token: this.tokenStorage.getToken(),
      username: this.tokenStorage.getUsername(),
      authorities: this.tokenStorage.getAuthority(),
      user_firstname: this.tokenStorage.getFirstname(),
      user_lastname: this.tokenStorage.getLastname()
    };
  }
  logout() {
    this.tokenStorage.signOut();
    window.location.assign("./../auth/login");
  }
}
