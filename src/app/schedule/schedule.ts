import {Subject} from "../subject/subject";

export interface Schedule {
  id?: number; // Може бути необов'язковим, оскільки генерується автоматично
  subject_id: Subject;
  teacher: string;
  link?: string; // Може бути необов'язковим
  number: number;
  classroom: string;
  day_of_week: string; // Якщо використовуються значення enum, змінити тип на enum
  week_type: string; // Якщо використовуються значення enum, змінити тип на enum
  group_type: string; // Якщо використовуються значення enum, змінити тип на enum
  type_of_lesson: string; // Якщо використовуються значення enum, змінити тип на enum
}
