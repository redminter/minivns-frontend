import {Component, OnInit} from '@angular/core';
import {HttpErrorResponse} from "@angular/common/http";
import {Subject} from "../subject";
import {SubjectService} from "../subject.service";

@Component({
  templateUrl: './subject-scheduled.component.html'
})
export class SubjectScheduledComponent implements OnInit {
  public subjects: Subject[] = [];


  constructor(private subjectService: SubjectService) {
  }

  ngOnInit() {
    this.getSubjects();
  }

  public getSubjects(): void {
    this.subjectService.getSubjectsSchedule().subscribe(
      (response: Subject[]) => {
        this.subjects = response;
        console.log(this.subjects);

      },
      (err: HttpErrorResponse) => {
        alert(err.message);
      });
  }
  public searchSubjects(keyWord: string): void {
    console.log(keyWord);
    const results: Subject[] = [];
    for (const subject of this.subjects) {
      if (subject.title.toLowerCase().indexOf(keyWord.toLowerCase()) !== -1){
        results.push(subject);
      }
    }
    this.subjects = results;
    if (results.length === 0 || !keyWord) {
      this.getSubjects();
    }
  }
}
