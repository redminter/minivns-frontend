import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {UserService} from "./User/user.service";
import {HttpClientModule} from "@angular/common/http";
import {FormsModule} from "@angular/forms";
import {SubjectService} from "./subject/subject.service";
import {SubjectComponent} from "./subject";
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
import { AddTaskModalComponent } from './task/add-task-modal/add-task-modal.component';
import { EditTaskModalComponent } from './task/edit-task-modal/./edit-task-modal.component';
import { DeleteModalComponent } from './task/delete-modal/delete-modal.component';
import { DoneTaskModalComponent } from './task/done-task-modal/done-task-modal.component';
import { SettingsComponent } from './settings/settings.component';
import { AddSubjectComponent } from './subject/add-subject/add-subject.component';
import { EditSubjectComponent } from './subject/edit-subject/edit-subject.component';
import { ScheduleComponent } from './schedule/schedule.component';
import { AddScheduleItemModalComponent } from './schedule/add-schedule-item-modal/add-schedule-item-modal.component';
import { UpdateScheduleItemModalComponent } from './schedule/update-schedule-item-modal/update-schedule-item-modal.component';
import { DeleteScheduleModalComponent } from './schedule/delete-schedule-modal/delete-schedule-modal.component';
import { DeleteSubjectModalComponent } from './subject/delete-subject-modal/delete-subject-modal.component';
import { AddUserComponent } from './User/add-user/add-user.component';
import { TruncateEmailPipe } from './User/truncate-email.pipe';
import { EditUserComponent } from './User/edit-user/edit-user.component';
import { DeleteUserModalComponent } from './User/delete-user-modal/delete-user-modal.component';
import { UndoneTaskModalComponent } from './task/undone-task-modal/undone-task-modal.component';



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
    AddScheduleItemModalComponent,
    UpdateScheduleItemModalComponent,
    DeleteScheduleModalComponent,
    DeleteSubjectModalComponent,
    AddUserComponent,
    TruncateEmailPipe,
    EditUserComponent,
    DeleteUserModalComponent,
    UndoneTaskModalComponent,
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
