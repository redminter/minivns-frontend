import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {SubjectComponent} from "./subject";
import {UserComponent} from "./User/user.component";
import {PageNotFoundComponent} from "./page-not-found/page-not-found.component";
import {TaskComponent} from "./task";
import {AllTasksByUserComponent} from "./task/all-tasks-by-user/all-tasks-by-user.component";
import {LoginComponent} from "./login/login.component";
import {ForbiddenComponent} from "./forbidden/forbidden.component";
import {ErrorComponent} from "./error/error.component";
import {MarksComponent} from "./task/all-tasks-by-user/marks/marks.component";
import {DashboardComponent} from "./dashboard/dashboard.component";
import {SettingsComponent} from "./settings/settings.component";
import {ScheduleComponent} from "./schedule/schedule.component";

const routes: Routes = [
  {path: '', redirectTo: "users/:user_id/dashboard", pathMatch: 'full'},
  {path: 'users/:user_id/dashboard', component: DashboardComponent},
  {path: 'subjects', component: SubjectComponent },
  {path: "users", component:UserComponent},
  {path: "users/:user_id/subjects/:subject_id/tasks", component:TaskComponent},
  {path: "users/:user_id/tasks", component:AllTasksByUserComponent},
  {path: "users/:user_id/marks", component:MarksComponent},
  {path: 'auth/login', component: LoginComponent},
  {path: 'forbidden', component: ForbiddenComponent},
  {path: 'err or', component: ErrorComponent},
  {path: 'settings', component: SettingsComponent},
  {path: 'schedule', component: ScheduleComponent},
  // otherwise redirect to page not Found

  { path: '**', component: PageNotFoundComponent}
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const appRoutingModule = RouterModule.forRoot(routes);
