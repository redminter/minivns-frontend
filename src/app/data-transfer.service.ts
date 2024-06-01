import { Injectable } from '@angular/core';
import { Task } from './task/task';
import {Schedule} from "./schedule/schedule";
import {Subject} from "./subject/subject";
import {User} from "./User/user";

@Injectable({
  providedIn: 'root'
})
export class DataTransferService {




  private _userId: string | null = null;
  private _subjectId: string | null = null;
  private _editTask: Task|null = null;
  private _deleteTask: Task|null = null;
  private _editSchedule: Schedule | null = null;
  private _deleteSchedule: Schedule | null = null;
  private _editSubject: Subject | null = null;
  private _deleteSubject: Subject | null = null;
  private _editUser: User | null = null;
  private _deleteUser: User | null = null;
  private _doneTask: Task | null = null;
  private _unDoneTask: Task | null = null;
  private _message: string | null = null;

  getMessage(): string | null {
    return this._message;
  }

  setMessage(value: string | null) {
    this._message = value;
  }
  getUnDoneTask(): Task | null {
    return this._unDoneTask;
  }

  setUnDoneTask(value: Task | null) {
    this._unDoneTask = value;
  }
  getDoneTask(): Task | null {
    return this._doneTask;
  }

  setDoneTask(value: Task | null) {
    this._doneTask = value;
  }

  getEditUser(): User | null {
    return this._editUser;
  }

  setEditUser(value: User | null) {
    this._editUser = value;
  }

  getDeleteUser(): User | null {
    return this._deleteUser;
  }

  setDeleteUser(value: User | null) {
    this._deleteUser = value;
  }
  getEditSubject(): Subject | null {
    return this._editSubject;
  }

  setEditSubject(value: Subject | null) {
    this._editSubject = value;
  }

  getDeleteSubject(): Subject | null {
    return this._deleteSubject;
  }

  setDeleteSubject(value: Subject | null) {
    this._deleteSubject = value;
  }

  setUserId(userId: string | null) {
    this._userId = userId;
  }

  getUserId() {
    return this._userId;
  }

  setSubjectId(subjectId: string | null) {
    this._subjectId = subjectId;
  }

  getSubjectId() {
    return this._subjectId;
  }

  getEditTask(): Task | null {
    return this._editTask;
  }

  setEditTask(value: Task | null) {
    this._editTask = value;
  }

  getDeleteTask(): Task | null {
    return this._deleteTask;
  }

  setDeleteTask(value: Task | null) {
    this._deleteTask = value;
  }

  getEditSchedule(): Schedule | null {
    return this._editSchedule;
  }

  setEditSchedule(value: Schedule | null) {
    this._editSchedule = value;
  }

  getDeleteSchedule(): Schedule | null {
    return this._deleteSchedule;
  }

  setDeleteSchedule(value: Schedule | null) {
    this._deleteSchedule = value;
  }
}
