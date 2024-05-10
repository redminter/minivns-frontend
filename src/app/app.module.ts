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
import { TaskComponent } from './task';
import { AllTasksByUserComponent } from './task/all-tasks-by-user/all-tasks-by-user.component';
import { LoginComponent } from './login/login.component';
import {httpInterceptorProviders} from "./auth/auth-interceptor";
import { ForbiddenComponent } from './forbidden/forbidden.component';
import { ErrorComponent } from './error/error.component';
import { MarksComponent } from './task/all-tasks-by-user/marks/marks.component';
import { DashboardComponent } from './dashboard/dashboard.component';


@NgModule({
  declarations: [
    AppComponent,
    SubjectComponent,
    UserComponent,
    PageNotFoundComponent,
    TaskComponent,
    AllTasksByUserComponent,
    LoginComponent,
    ForbiddenComponent,
    ErrorComponent,
    MarksComponent,
    DashboardComponent,
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
