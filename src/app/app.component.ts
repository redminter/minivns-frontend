import {Component, OnInit} from '@angular/core';
import {User} from "./User/user";
import {HttpErrorResponse} from "@angular/common/http";
import {UserService} from "./User/user.service";
import {NgForm} from "@angular/forms";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent{
  title = 'minivns';
}
