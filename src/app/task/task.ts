import {Subject} from "../Subject/subject";

export interface Task{
  id : number;
  title:string;
  link:string;
  metoda_link:string;
  deadline:Date;
  done_date:Date;
  is_done:boolean;
  subject_id:Subject;
  mark:number;
  max_mark:number;

}
