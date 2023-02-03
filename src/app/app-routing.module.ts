import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {SubjectComponent} from "./Subject";
import {UserComponent} from "./User/user.component";
import {PageNotFoundComponent} from "./page-not-found/page-not-found.component";
import {SubjectScheduledComponent} from "./Subject/subject-scheduled/subject-scheduled.component";

const routes: Routes = [
  {path: '', component:UserComponent},
  {path: 'subjects/scheduled', component: SubjectScheduledComponent },
  {path: 'subjects', component: SubjectComponent },
  {path: "users", component:UserComponent},

  // otherwise redirect to page not Found
  { path: '**', component: PageNotFoundComponent}
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const appRoutingModule = RouterModule.forRoot(routes);
