import { Component } from '@angular/core';
import {SubjectService} from "../subject/subject.service";
import {TokenStorageService} from "../auth/token-storage.service";
import {ScheduleService} from "./schedule.service";
import {Schedule} from "./schedule";
import {HttpErrorResponse} from "@angular/common/http";
import {ModalService} from "../task/add-task-modal/modal.service";
import {DataTransferService} from "../data-transfer.service";

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.css']
})
export class ScheduleComponent {
  public scheduleItems: Schedule[] = [];
  // @ts-ignore
  user_id:number;
  // @ts-ignore
  role: string;
  // @ts-ignore
  authority: string;
  info: any;
  user_firstname:any;
  user_lastname:any;
  username:any;
  public groupedByDays: Record<string, Schedule[]> = {};
  isExpanded: boolean[] = [];
  constructor(private dataTransferService: DataTransferService, private modalService: ModalService, private scheduleService: ScheduleService, private tokenStorage: TokenStorageService) {
  }

  // @ts-ignore
  ngOnInit() {
    this.getSchedule();
    this.user_id=this.tokenStorage.getId();
    this.username= this.tokenStorage.getUsername();
    this.authority=this.tokenStorage.getAuthority();
    this.user_firstname=this.tokenStorage.getFirstname();
    this.user_lastname= this.tokenStorage.getLastname();
    if (this.tokenStorage.getToken()) {
      this.role = this.tokenStorage.getAuthority();
      if (this.role === 'ROLE_ADMIN') {
        this.authority = 'admin';
        return false;
      } else if (this.role === 'ROLE_PM') {
        this.authority = 'pm';
        return false;
      }
      this.authority = 'user';
      return true;
    }
    this.info = {
      token: this.tokenStorage.getToken(),
      username: this.tokenStorage.getUsername(),
      authorities: this.tokenStorage.getAuthority(),
      user_firstname: this.tokenStorage.getFirstname(),
      user_lastname: this.tokenStorage.getLastname()
    };
  }

  private groupSchedulesByDay(schedules: Schedule[]): Record<string, Schedule[]> {
    return schedules.reduce((acc, schedule) => {
      const day = schedule.day_of_week;
      if (!acc[day]) {
        acc[day] = [];
      }
      acc[day].push(schedule);
      return acc;
    }, {} as Record<string, Schedule[]>);
  }

  public getWeekType(week_type: string): string {
    if (week_type === 'EVEN') {
      return 'З';
    } else if (week_type === 'ODD') {
      return 'Ч';
    } else {
      return 'Invalid week_type';
    }
  }

  public getGroupType(group_type: string): string {
    if (group_type === 'HALF_GROUP_2') {
      return 'II';
    } else if (group_type === 'HALF_GROUP_1') {
      return 'I';
    } else {
      return 'Уся';
    }
  }
  public getSchedule(): void {

    this.scheduleService.getSchedule().subscribe(
      (response: Schedule[]) => {
        this.scheduleItems = response;
        console.log(this.scheduleItems);
        this.groupedByDays = this.groupSchedulesByDay(this.scheduleItems);
        console.log(this.groupedByDays);

      },
      (error: HttpErrorResponse) => {
        //alert(error.message);
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

  public getDays(): string[] {
    const orderedDays = ['ПОНЕДІЛОК', 'ВІВТОРОК', 'СЕРЕДА', 'ЧЕТВЕР', 'ПЯТНИЦЯ'];
    orderedDays.forEach(day => {
      if (this.groupedByDays.hasOwnProperty(day)) {
        this.groupedByDays[day].sort((a, b) => a.number - b.number);
      }
    });
    return orderedDays.filter(day => this.groupedByDays.hasOwnProperty(day));
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

  openModal(){
    this.modalService.openAddScheduleModule();
  }
  openUpdateModal(schedule: Schedule){
    this.dataTransferService.setEditSchedule(schedule);
    this.dataTransferService.setDeleteSchedule(schedule);
    this.modalService.openEditScheduleModule();
  }
  getRotation(i: number) {
    return this.isExpanded[i] ? '180deg' : '0deg';
  }
}
