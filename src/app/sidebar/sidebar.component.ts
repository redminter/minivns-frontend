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

  public user_id: number | undefined;
  constructor( private activatedRoute: ActivatedRoute, private tokenStorage: TokenStorageService) {
  }

  ngOnInit() {
    this.user_id = this.tokenStorage.getId();
  }
  logout() {
    this.tokenStorage.signOut();
    window.location.assign("./../auth/login");
  }
}
