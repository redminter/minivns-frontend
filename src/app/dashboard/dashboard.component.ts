import { Component } from '@angular/core';
import {Subject} from "../subject/subject";
import {SubjectService} from "../subject/subject.service";
import {UserService} from "../User/user.service";
import {Task} from "../task/task";
import {TaskService} from "../task/task.service";
import {SubjectComponent} from "../subject"
import {UserComponent} from "../User/user.component";
import {TaskComponent} from "../task";
import {AllTasksByUserComponent} from "../task/all-tasks-by-user/all-tasks-by-user.component";
import {MarksComponent} from "../task/all-tasks-by-user/marks/marks.component";
import {LoginComponent} from "../login/login.component";
import {TokenStorageService} from "../auth/token-storage.service";
import {HttpErrorResponse} from "@angular/common/http";
import {ActivatedRoute, NavigationEnd, Router} from "@angular/router";
import {Schedule} from "../schedule/schedule";
import {ScheduleService} from "../schedule/schedule.service";
import {DataTransferService} from "../data-transfer.service";
import {filter, map} from "rxjs";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  public tasks: Task[] = [];
  public arrayOfArrays: Task[][] = [];
  public totalMarksPerArray: number[] = [];
  public sortedTasks: Task[] = [];
  public diffInDays: number = 0;
  public doneTasksPercentage: number = 0;
  public subjects: Subject[] = [];
  public schedules: Schedule[] = [];
  // @ts-ignore
  user_id: string | null;
  // @ts-ignore
  role: string;
  // @ts-ignore
  authority: string;
  info: any;
  user_firstname:any;
  user_lastname:any;
  group:any;
  gender:any;
  username:any;
  title = '';
  constructor(private router:Router, private dataTransfer:DataTransferService, private scheduleService: ScheduleService, private taskService: TaskService, private activatedRoute: ActivatedRoute, private tokenStorage: TokenStorageService, private subjectService: SubjectService,) {
    this.user_id = this.activatedRoute.snapshot.paramMap.get('user_id');
    this.dataTransfer.setMessage("Вітаю, " + this.user_firstname + "!");
  }
  // @ts-ignore
  ngOnInit() {

    this.getTasksByUser();
    this.getScheduleToday();
    console.log(this.tokenStorage.getGroup());
    this.username = this.tokenStorage.getUsername();
    this.authority = this.tokenStorage.getAuthority();
    this.user_firstname = this.tokenStorage.getFirstname();
    this.user_lastname = this.tokenStorage.getLastname();
    this.group = this.tokenStorage.getGroup();
    this.gender = this.tokenStorage.getGender();
    console.log(this.group);


    if (this.tokenStorage.getToken()) {
      this.role = this.tokenStorage.getAuthority();
      if (this.role === 'ROLE_ADMIN') {
        this.authority = 'admin';
        return false;
      }
      this.authority = 'user';
      return true;
    }
  }

  public getTasksByUser(): void {

    this.taskService.getTasksByUser(this.user_id).subscribe(
      (response: Task[]) => {
        this.tasks = response;

        let doneTasksCount = 0;
        for (let task of this.tasks) {
          if (task.is_done) {
            doneTasksCount++;
          }
        }
        this.doneTasksPercentage = (doneTasksCount / this.tasks.length) * 100;
        this.doneTasksPercentage = Math.round(this.doneTasksPercentage * 100) / 100;
        console.log(`Percentage of tasks that are done: ${this.doneTasksPercentage}%`);


        this.sortedTasks = this.tasks.sort((a, b) => new Date(a.deadline).getTime() - new Date(b.deadline).getTime());
        this.sortedTasks = this.sortedTasks.slice(0, 2);
        this.sortedTasks = this.sortedTasks.filter(task => task.is_done === false);
        const groupedTasks = this.tasks.reduce((acc, task) => {
          // Check if the array for this 'subject_id' already exists
          // @ts-ignore
          if (!acc[task.subject_id.id]) {
            // @ts-ignore
            acc[task.subject_id.id] = []; // If not, create it
          }
          // @ts-ignore
          acc[task.subject_id.id].push(task); // Add the task to the array
          return acc;
        }, {});

        this.arrayOfArrays = Object.values(groupedTasks);
        // Convert the object of arrays into an array of arrays

        this.totalMarksPerArray = this.arrayOfArrays.map(taskArray => {
          let totalMarks = 0;
          for (let task of taskArray) {
            if (task.mark) {
              totalMarks += task.mark;
            }
          }
          return totalMarks;
        });
        this.arrayOfArrays = this.arrayOfArrays.slice(0, 3);
        console.log(this.arrayOfArrays);
        console.log(this.sortedTasks);
        console.log(this.totalMarksPerArray);
      },
      (error: HttpErrorResponse) => {
        // alert(error.message);
        if (error.status === 403) {
          window.location.assign("/forbidden");
        } else {
          window.location.assign("/error");
        }
        if (error.status === 401) {
          window.location.assign("/forbidden");
        }
      }
    );
  }

  public getDate(task: Task): String {
    const monthNames = ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"];
    let date = new Date(task.deadline);
    return String(date.getDate()) + "." + monthNames[date.getMonth()];
  }
  public getDateNow(): String {
    const monthNames = ["Січня", "Лютого", "Березня", "Квітня", "Травня", "Червня", "Липня", "Серпня", "Вересня", "Жовтня", "Листопада", "Грудня"];
    let date = new Date();
    return String(date.getDate()) + " " + monthNames[date.getMonth()];
  }



  public diffindays(task: Task): number {
      const deadline = new Date(task.deadline);
      const deadlineDate = new Date(task.deadline);
      const now = new Date();
      const diffInTime = deadline.getTime() - now.getTime();
      this.diffInDays = Math.ceil(diffInTime / (1000 * 60 * 60 * 24));
      const currentDate = new Date();
      if(this.diffInDays<0){
        return this.diffInDays = 0;
      }
      return this.diffInDays;
  }

  public getScheduleToday(): void {
    this.scheduleService.getSchedule().subscribe(
      (response: Schedule[]) => {
        const today = new Date().getDay();
        let dayName:string="";
        switch (today) {
          case 1:
            dayName = "Понеділок";
            break;
          case 2:
            dayName = "Вівторок";
            break;
          case 3:
            dayName = "Середа";
            break;
          case 4:
            dayName = "Четвер";
            break;
          case 5:
            dayName = "Пятниця";
            break;
        }
        console.log(today);
        this.schedules = response.filter(schedule => schedule.day_of_week === dayName.toUpperCase());
      },
      (error: HttpErrorResponse) => {
        //alert(error.message);
        if (error.status === 403) {
          window.location.assign("/forbidden");
        } else {
          window.location.assign("/error");
        }
      }
    );
  }

  public getTimeByNumber(number: number): string {
    const SCHEDULE_TIMES = [
      { number: 1, start: "08:30", end: "09:50" },
      { number: 2, start: "10:05", end: "11:25" },
      { number: 3, start: "11:40", end: "13:00" },
      { number: 4, start: "13:15", end: "14:35" },
      { number: 5, start: "14:50", end: "16:10" },
      { number: 6, start: "16:25", end: "17:45" },
      { number: 7, start: "18:00", end: "19:20" },
      { number: 8, start: "19:30", end: "20:50" }
    ];
    const selectedTime = SCHEDULE_TIMES.find(time => time.number === number);
    if (selectedTime) {
      return `${selectedTime.start} - ${selectedTime.end}`;
    } else {
      return 'Invalid number';
    }
  }
  logout() {
    this.tokenStorage.signOut();
    window.location.assign("/subjects/scheduled")
  }

  protected readonly Date = Date;
}
