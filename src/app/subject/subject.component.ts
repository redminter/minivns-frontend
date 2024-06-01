import {Component, OnInit} from '@angular/core';
import {HttpErrorResponse} from "@angular/common/http";
import {NgForm} from "@angular/forms";
import {Subject} from "./subject";
import {SubjectService} from "./subject.service";
import {TokenStorageService} from "../auth/token-storage.service";
import {ModalService} from "../task/add-task-modal/modal.service";
import {DataTransferService} from "../data-transfer.service";

@Component({
  templateUrl: './subject.component.html',
  styleUrls: ['./subject.component.css']
})
export class SubjectComponent implements OnInit{
  isExpanded: boolean[] = [];
  public subjects: Subject[] = [];
  public weekSubjects: Subject[][] = [];
  public weekDays: string[] = [];
  // @ts-ignore
  public subject: Subject | null;
  // @ts-ignore
  public editSubject: Subject | null;
  // @ts-ignore
  public deleteSubject: Subject | null;
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
  constructor(private dataTransfer:DataTransferService, private modalService: ModalService, private subjectService: SubjectService, private tokenStorage: TokenStorageService) {
  }
  // @ts-ignore
  ngOnInit() {
    this.getSubjects();
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
  public getSubjects(): void {
    this.subjectService.getSubjects().subscribe(
      (response: Subject[]) => {
        this.subjects = response;
        console.log(this.subjects);
      },
      (error: HttpErrorResponse) => {
        //alert(error.message);
        if (error.status === 403) {
          window.location.assign("/forbidden");
        }else {
          window.location.assign("/error");
        }
        if (error.status === 401) {
          window.location.assign("/forbidden");
        }
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
      this.dataTransfer.setEditSubject(subject);
      this.dataTransfer.setDeleteSubject(subject);
      this.modalService.openEditSubjectModule();
      button.setAttribute('data-target', '#updateSubjectModal');
    }
    if (mode === 'delete') {
      this.deleteSubject = subject;
      button.setAttribute('data-target', '#deleteSubjectModal');
    }
    if(mode === 'user'){
      this.subject=subject;
      button.setAttribute('data-target', '#infoUserModal');
    }
    // @ts-ignore
    container.appendChild(button);
    button.click();
  }
  logout() {
    this.tokenStorage.signOut();
    window.location.assign("/subjects/scheduled")
  }
}
