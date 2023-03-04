import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {UserService} from "./User/user.service";
import {HttpClientModule} from "@angular/common/http";
import {FormsModule} from "@angular/forms";
import {SubjectService} from "./Subject/subject.service";
import {SubjectComponent} from "./Subject";
import {UserComponent} from "./User/user.component";
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { SubjectScheduledComponent } from './Subject/subject-scheduled/subject-scheduled.component';
import { TaskComponent } from './task';
import { AllTasksByUserComponent } from './task/all-tasks-by-user/all-tasks-by-user.component';
import { LoginComponent } from './login/login.component';
import {httpInterceptorProviders} from "./auth/auth-interceptor";
import { ForbiddenComponent } from './forbidden/forbidden.component';
import { ErrorComponent } from './error/error.component';


@NgModule({
  declarations: [
    AppComponent,
    SubjectComponent,
    UserComponent,
    PageNotFoundComponent,
    SubjectScheduledComponent,
    TaskComponent,
    AllTasksByUserComponent,
    LoginComponent,
    ForbiddenComponent,
    ErrorComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [UserService, SubjectService, httpInterceptorProviders],
  bootstrap: [AppComponent]
})
export class AppModule { }
