import {
  ApplicationRef,
  ComponentFactoryResolver,
  ComponentRef,
  EmbeddedViewRef,
  Injectable,
  Injector
} from '@angular/core';
import {AddTaskModalComponent} from "./add-task-modal.component";
import {EditTaskModalComponent} from "../edit-task-modal/edit-task-modal.component";
import {DeleteModalComponent} from "../delete-modal/delete-modal.component";
import {DoneTaskModalComponent} from "../done-task-modal/done-task-modal.component";
import {AddSubjectComponent} from "../../subject/add-subject/add-subject.component";
import {EditSubjectComponent} from "../../subject/edit-subject/edit-subject.component";
import {AddScheduleItemModalComponent} from "../../schedule/add-schedule-item-modal/add-schedule-item-modal.component";
import {UpdateScheduleItemModalComponent} from "../../schedule/update-schedule-item-modal/update-schedule-item-modal.component";
import {DeleteScheduleModalComponent} from "../../schedule/delete-schedule-modal/delete-schedule-modal.component";
import {DeleteSubjectModalComponent} from "../../subject/delete-subject-modal/delete-subject-modal.component";
import {AddUserComponent} from "../../User/add-user/add-user.component";
import {EditUserComponent} from "../../User/edit-user/edit-user.component";
import {DeleteUserModalComponent} from "../../User/delete-user-modal/delete-user-modal.component";
import {UndoneTaskModalComponent} from "../undone-task-modal/undone-task-modal.component";

@Injectable({
  providedIn: 'root'
})
export class ModalService {

  // @ts-ignore
  private componentRefAdd: ComponentRef<AddTaskModalComponent>;
  // @ts-ignore
  private componentRefEdit: ComponentRef<EditTaskModalComponent>;
  // @ts-ignore
  private componentRefDelete: ComponentRef<DeleteModalComponent>;
  // @ts-ignore
  private componentRefDone: ComponentRef<DoneTaskModalComponent>;
  // @ts-ignore
  private componentRefUndone: ComponentRef<UndoneTaskModalComponent>;
  // @ts-ignore
  private componentRefAddSubject: ComponentRef<AddSubjectComponent>;
  // @ts-ignore
  private componentRefEditSubject: ComponentRef<EditSubjectComponent>;
  // @ts-ignore
  private componentRefDeleteSubject: ComponentRef<DeleteSubjectModalComponent>;
  // @ts-ignore
  private componentRefAddSchedule: ComponentRef<AddScheduleItemModalComponent>;
  // @ts-ignore
  private componentRefEditSchedule: ComponentRef<UpdateScheduleItemModalComponent>;
  // @ts-ignore
  private componentRefDeleteSchedule: ComponentRef<DeleteScheduleModalComponent>;
  // @ts-ignore
  private componentRefAddUser: ComponentRef<AddUserComponent>;
  // @ts-ignore
  private componentRefEditUser: ComponentRef<EditUserComponent>;
  // @ts-ignore
  private componentRefDeleteUser: ComponentRef<DeleteUserModalComponent>;

  constructor(private componentFactoryResolver: ComponentFactoryResolver, private appRef: ApplicationRef, private injector: Injector) {

  }

  openAddModule() {
    if (this.componentRefDelete || this.componentRefEdit || this.componentRefAdd)
    {
      return;
    }
    this.componentRefAdd = this.componentFactoryResolver
      .resolveComponentFactory(AddTaskModalComponent)
      .create(this.injector);

    this.appRef.attachView(this.componentRefAdd.hostView);

    const domElem = (this.componentRefAdd.hostView as EmbeddedViewRef<any>)
      .rootNodes[0] as HTMLElement;

    document.body.appendChild(domElem);
  }

  openAddUserModule() {
    if (this.componentRefAddUser) {
      return;
    }
    this.componentRefAddUser = this.componentFactoryResolver
      .resolveComponentFactory(AddUserComponent)
      .create(this.injector);

    this.appRef.attachView(this.componentRefAddUser.hostView);

    const domElem = (this.componentRefAddUser.hostView as EmbeddedViewRef<any>)
      .rootNodes[0] as HTMLElement;

    document.body.appendChild(domElem);
  }
  openEditModule() {
    if (this.componentRefDelete || this.componentRefEdit || this.componentRefAdd) {
      return;
    }
    this.componentRefEdit = this.componentFactoryResolver
      .resolveComponentFactory(EditTaskModalComponent)
      .create(this.injector);

    this.appRef.attachView(this.componentRefEdit.hostView);

    const domElem = (this.componentRefEdit.hostView as EmbeddedViewRef<any>)
      .rootNodes[0] as HTMLElement;

    document.body.appendChild(domElem);
  }

  openDeleteModule() {
    if (this.componentRefDelete || this.componentRefEdit || this.componentRefAdd) {
      return;
    }
    this.componentRefDelete = this.componentFactoryResolver
      .resolveComponentFactory(DeleteModalComponent)
      .create(this.injector);

    this.appRef.attachView(this.componentRefDelete.hostView);

    const domElem = (this.componentRefDelete.hostView as EmbeddedViewRef<any>)
      .rootNodes[0] as HTMLElement;

    document.body.appendChild(domElem);
  }

  openDoneModule() {
    if (this.componentRefDelete || this.componentRefEdit || this.componentRefAdd) {
      return;
    }
    this.componentRefDone = this.componentFactoryResolver
      .resolveComponentFactory(DoneTaskModalComponent)
      .create(this.injector);

    this.appRef.attachView(this.componentRefDone.hostView);

    const domElem = (this.componentRefDone.hostView as EmbeddedViewRef<any>)
      .rootNodes[0] as HTMLElement;

    document.body.appendChild(domElem);
  }

  openAddSubjectModule() {
    if (this.componentRefAddSubject) {
      return;
    }
    this.componentRefAddSubject = this.componentFactoryResolver
      .resolveComponentFactory(AddSubjectComponent)
      .create(this.injector);

    this.appRef.attachView(this.componentRefAddSubject.hostView);

    const domElem = (this.componentRefAddSubject.hostView as EmbeddedViewRef<any>)
      .rootNodes[0] as HTMLElement;

    document.body.appendChild(domElem);
  }

openEditSubjectModule() {
    if (this.componentRefEditSubject) {
      return;
    }
    this.componentRefEditSubject = this.componentFactoryResolver
      .resolveComponentFactory(EditSubjectComponent)
      .create(this.injector);

    this.appRef.attachView(this.componentRefEditSubject.hostView);

    const domElem = (this.componentRefEditSubject.hostView as EmbeddedViewRef<any>)
      .rootNodes[0] as HTMLElement;

    document.body.appendChild(domElem);
  }

  openDeleteSubjectModule() {
    if (this.componentRefDeleteSubject) {
      return;
    }
    this.componentRefDeleteSubject = this.componentFactoryResolver
      .resolveComponentFactory(DeleteSubjectModalComponent)
      .create(this.injector);

    this.appRef.attachView(this.componentRefDeleteSubject.hostView);

    const domElem = (this.componentRefDeleteSubject.hostView as EmbeddedViewRef<any>)
      .rootNodes[0] as HTMLElement;

    document.body.appendChild(domElem);
  }
  openAddScheduleModule() {
    if (this.componentRefAddSchedule) {
      return;
    }
    this.componentRefAddSchedule = this.componentFactoryResolver
      .resolveComponentFactory(AddScheduleItemModalComponent)
      .create(this.injector);

    this.appRef.attachView(this.componentRefAddSchedule.hostView);

    const domElem = (this.componentRefAddSchedule.hostView as EmbeddedViewRef<any>)
      .rootNodes[0] as HTMLElement;

    document.body.appendChild(domElem);
  }

  openEditScheduleModule() {
    if (this.componentRefEditSchedule) {
      return;
    }
    this.componentRefEditSchedule = this.componentFactoryResolver
      .resolveComponentFactory(UpdateScheduleItemModalComponent)
      .create(this.injector);

    this.appRef.attachView(this.componentRefEditSchedule.hostView);

    const domElem = (this.componentRefEditSchedule.hostView as EmbeddedViewRef<any>)
      .rootNodes[0] as HTMLElement;

    document.body.appendChild(domElem);
  }

  openDeleteScheduleModule() {
    if (this.componentRefDeleteSchedule) {
      return;
    }
    this.componentRefDeleteSchedule = this.componentFactoryResolver
      .resolveComponentFactory(DeleteScheduleModalComponent)
      .create(this.injector);

    this.appRef.attachView(this.componentRefDeleteSchedule.hostView);

    const domElem = (this.componentRefDeleteSchedule.hostView as EmbeddedViewRef<any>)
      .rootNodes[0] as HTMLElement;

    document.body.appendChild(domElem);
  }
  openEditUserModule() {
    if (this.componentRefEditUser) {
      return;
    }
    this.componentRefEditUser = this.componentFactoryResolver
      .resolveComponentFactory(EditUserComponent)
      .create(this.injector);

    this.appRef.attachView(this.componentRefEditUser.hostView);

    const domElem = (this.componentRefEditUser.hostView as EmbeddedViewRef<any>)
      .rootNodes[0] as HTMLElement;

    document.body.appendChild(domElem);
  }

  openDeleteUserModule() {
    if (this.componentRefDeleteUser) {
      return;
    }
    this.componentRefDeleteUser = this.componentFactoryResolver
      .resolveComponentFactory(DeleteUserModalComponent)
      .create(this.injector);

    this.appRef.attachView(this.componentRefDeleteUser.hostView);

    const domElem = (this.componentRefDeleteUser.hostView as EmbeddedViewRef<any>)
      .rootNodes[0] as HTMLElement;

    document.body.appendChild(domElem);
  }
  openUnDoneModule() {
    if (this.componentRefDelete || this.componentRefEdit || this.componentRefAdd) {
      return;
    }
    this.componentRefUndone = this.componentFactoryResolver
      .resolveComponentFactory(UndoneTaskModalComponent)
      .create(this.injector);

    this.appRef.attachView(this.componentRefUndone.hostView);

    const domElem = (this.componentRefUndone.hostView as EmbeddedViewRef<any>)
      .rootNodes[0] as HTMLElement;

    document.body.appendChild(domElem);
  }

  closeAdd() {
    if (this.componentRefAdd) {
      this.appRef.detachView(this.componentRefAdd.hostView);
      this.componentRefAdd.destroy();
      // @ts-ignore
      this.componentRefAdd = null;
    }
  }

  closeUndone() {
    if (this.componentRefUndone) {
      this.appRef.detachView(this.componentRefUndone.hostView);
      this.componentRefUndone.destroy();
      // @ts-ignore
      this.componentRefUndone = null;
    }
  }
  closeAddSchedule() {
    if (this.componentRefAddSchedule) {
      this.appRef.detachView(this.componentRefAddSchedule.hostView);
      this.componentRefAddSchedule.destroy();
      // @ts-ignore
      this.componentRefAddSchedule = null;
    }
  }

  closeEditSchedule() {
    if (this.componentRefEditSchedule) {
      this.appRef.detachView(this.componentRefEditSchedule.hostView);
      this.componentRefEditSchedule.destroy();
      // @ts-ignore
      this.componentRefEditSchedule = null;
    }
  }
  closeEdit() {
    if (this.componentRefEdit) {
      this.appRef.detachView(this.componentRefEdit.hostView);
      this.componentRefEdit.destroy();
      // @ts-ignore
      this.componentRefEdit = null;
    }
  }

  closeDelete() {
    if (this.componentRefDelete) {
      this.appRef.detachView(this.componentRefDelete.hostView);
      this.componentRefDelete.destroy();
      // @ts-ignore
      this.componentRefDelete = null;
    }
  }

  closeDone() {
    if (this.componentRefDone) {
      this.appRef.detachView(this.componentRefDone.hostView);
      this.componentRefDone.destroy();
      // @ts-ignore
      this.componentRefDone = null;
    }
  }

  closeAddSubject() {
    if (this.componentRefAddSubject) {
      this.appRef.detachView(this.componentRefAddSubject.hostView);
      this.componentRefAddSubject.destroy();
      // @ts-ignore
      this.componentRefAddSubject = null;
    }
  }

  closeEditSubject() {
    if (this.componentRefEditSubject) {
      this.appRef.detachView(this.componentRefEditSubject.hostView);
      this.componentRefEditSubject.destroy();
      // @ts-ignore
      this.componentRefEditSubject = null;
    }
  }
  closeDeleteSchedule() {
    if (this.componentRefDeleteSchedule) {
      this.appRef.detachView(this.componentRefDeleteSchedule.hostView);
      this.componentRefDeleteSchedule.destroy();
      // @ts-ignore
      this.componentRefDeleteSchedule = null;
    }
  }
  closeDeleteSubject() {
    if (this.componentRefDeleteSubject) {
      this.appRef.detachView(this.componentRefDeleteSubject.hostView);
      this.componentRefDeleteSubject.destroy();
      // @ts-ignore
      this.componentRefDeleteSubject = null;
    }
  }
  closeAddUser() {
    if (this.componentRefAddUser) {
      this.appRef.detachView(this.componentRefAddUser.hostView);
      this.componentRefAddUser.destroy();
      // @ts-ignore
      this.componentRefAddUser = null;
    }
  }

  closeEditUser() {
    if (this.componentRefEditUser) {
      this.appRef.detachView(this.componentRefEditUser.hostView);
      this.componentRefEditUser.destroy();
      // @ts-ignore
      this.componentRefEditUser = null;
    }
  }

  closeDeleteUser() {
    if (this.componentRefDeleteUser) {
      this.appRef.detachView(this.componentRefDeleteUser.hostView);
      this.componentRefDeleteUser.destroy();
      // @ts-ignore
      this.componentRefDeleteUser = null;
    }
  }

}
