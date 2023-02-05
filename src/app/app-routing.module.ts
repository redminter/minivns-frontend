import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {SubjectComponent} from "./Subject";
import {UserComponent} from "./User/user.component";
import {PageNotFoundComponent} from "./page-not-found/page-not-found.component";
import {SubjectScheduledComponent} from "./Subject/subject-scheduled/subject-scheduled.component";
import {TaskComponent} from "./task";
import {AllTasksByUserComponent} from "./task/all-tasks-by-user/all-tasks-by-user.component";

const routes: Routes = [
  {path: '', component:UserComponent},
  {path: 'subjects/scheduled', component: SubjectScheduledComponent },
  {path: 'subjects', component: SubjectComponent },
  {path: "users", component:UserComponent},
  {path: "users/:user_id/subjects/:subject_id/tasks", component:TaskComponent},
  {path: "users/:user_id/tasks", component:AllTasksByUserComponent},
  // otherwise redirect to page not Found
  { path: '**', component: PageNotFoundComponent}
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const appRoutingModule = RouterModule.forRoot(routes);
