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
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { AddTaskModalComponent } from './add-task-modal/add-task-modal.component';
import { EditTaskModalComponent } from './edit-task-modal/./edit-task-modal.component';
import { DeleteModalComponent } from './delete-modal/delete-modal.component';
import { DoneTaskModalComponent } from './done-task-modal/done-task-modal.component';
import { SettingsComponent } from './settings/settings.component';
import { AddSubjectComponent } from './add-subject/add-subject.component';
import { EditSubjectComponent } from './edit-subject/edit-subject.component';
import { ScheduleComponent } from './schedule/schedule.component';



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
    FooterComponent,
    HeaderComponent,
    SidebarComponent,
    AddTaskModalComponent,
    EditTaskModalComponent,
    DeleteModalComponent,
    DoneTaskModalComponent,
    SettingsComponent,
    AddSubjectComponent,
    EditSubjectComponent,
    ScheduleComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
  ],
  providers: [UserService, SubjectService, httpInterceptorProviders],
  bootstrap: [AppComponent]
})
export class AppModule { }
