export interface Task{
  id : number;
  title:string;
  link:string;
  deadline:Date;
  done_date:Date;
  is_done:boolean;
  subject_id:number;
  mark:number;
  max_mark:number;

}
