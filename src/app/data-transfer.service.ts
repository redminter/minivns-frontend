import { Injectable } from '@angular/core';
import { Task } from './task/task';

@Injectable({
  providedIn: 'root'
})
export class DataTransferService {

  private _userId: string | null = null;
  private _subjectId: string | null = null;
  private _editTask: Task|null = null;
  private _deleteTask: Task|null = null;

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
}
