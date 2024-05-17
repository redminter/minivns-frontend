export interface Subject {
  id: number;
  title: string;
  teacher: string;
  vns_url: string;
  pract_url: string;
  lab_url: string;
  lection_url: string;

  credit:number;
  at_monday: boolean;
  at_tuesday: boolean;
  at_wednesday: boolean;
  at_thursday: boolean;
  at_friday: boolean;
}
