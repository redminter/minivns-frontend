import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataTransferService {
  private userId: string | null = null;
  private subjectId: string | null = null;

  setUserId(userId: string | null) {
    this.userId = userId;
  }

  getUserId() {
    return this.userId;
  }

  setSubjectId(subjectId: string | null) {
    this.subjectId = subjectId;
  }

  getSubjectId() {
    return this.subjectId;
  }
}
