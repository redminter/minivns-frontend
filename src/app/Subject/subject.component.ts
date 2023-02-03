import {Component, OnInit} from '@angular/core';
import {HttpErrorResponse} from "@angular/common/http";
import {NgForm} from "@angular/forms";
import {Subject} from "./subject";
import {SubjectService} from "./subject.service";

@Component({
  templateUrl: './subject.component.html'
})
export class SubjectComponent implements OnInit{
  public subjects: Subject[] = [];
  public subject: Subject | undefined;
  // @ts-ignore
  public editSubject: Subject | null;
  // @ts-ignore
  public deleteSubject: Subject | null;
  constructor(private subjectService: SubjectService) {
  }
  ngOnInit() {
    this.getSubjects();
  }
  public getSubjects(): void {
    this.subjectService.getSubjects().subscribe(
      (response: Subject[]) => {
        this.subjects = response;
        console.log(this.subjects);

      },
      (err: HttpErrorResponse) => {
        alert(err.message);
      });
  }
  public onAddSubject(addForm: NgForm): void {
    let subject = addForm.value;
    // @ts-ignore
    document.getElementById('add-subject-form').click();
    this.subjectService.addSubject(subject).subscribe(
      (response: Subject) => {
        console.log(response);
        this.getSubjects();
        addForm.reset();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
        addForm.reset();
      }
    );
  }
  public onUpdateSubject(updateForm: NgForm, subjectId:number|undefined): void {
    // @ts-ignore
    document.getElementById('update-subject-form').click();
    this.subjectService.updateSubject(subjectId, updateForm.value).subscribe(
      (response: Subject) => {
        console.log(response);
        this.getSubjects();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }
  public onDeleteSubject( subjectId:number|undefined): void {
    this.subjectService.deleteSubject(subjectId).subscribe(
      (response: void) => {
        console.log(response);
        this.getSubjects();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
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
  public onOpenModal(subject: Subject|null, mode: string): void {
    const container = document.getElementById('main-container');
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-toggle', 'modal');
    if (mode === 'add') {
      button.setAttribute('data-target', '#addSubjectModal');
    }
    if (mode === 'edit') {
      this.editSubject = subject;
      button.setAttribute('data-target', '#updateSubjectModal');
    }
    if (mode === 'delete') {
      this.deleteSubject = subject;
      button.setAttribute('data-target', '#deleteSubjectModal');
    }
    // @ts-ignore
    container.appendChild(button);
    button.click();
  }
}
