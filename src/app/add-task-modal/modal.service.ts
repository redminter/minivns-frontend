import {
  ApplicationRef,
  ComponentFactoryResolver,
  ComponentRef,
  EmbeddedViewRef,
  Injectable,
  Injector
} from '@angular/core';
import {AddTaskModalComponent} from "./add-task-modal.component";
import {EditTaskModalComponent} from "../edit-task-modal/./edit-task-modal.component";
import {DeleteModalComponent} from "../delete-modal/delete-modal.component";
import {DoneTaskModalComponent} from "../done-task-modal/done-task-modal.component";
import {AddSubjectComponent} from "../add-subject/add-subject.component";
import {EditSubjectComponent} from "../edit-subject/edit-subject.component";
import {HttpErrorResponse} from "@angular/common/http";
import {NgForm} from "@angular/forms";
import { Task } from '../task/task';
import {TaskService} from "../task/task.service";
import {ActivatedRoute} from "@angular/router";
import {TokenStorageService} from "../auth/token-storage.service";
import {SubjectService} from "../Subject/subject.service";

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
  private componentRefAddSubject: ComponentRef<AddSubjectComponent>;
  // @ts-ignore
  private componentRefEditSubject: ComponentRef<EditSubjectComponent>;

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

  closeAdd() {
    if (this.componentRefAdd) {
      this.appRef.detachView(this.componentRefAdd.hostView);
      this.componentRefAdd.destroy();
      // @ts-ignore
      this.componentRefAdd = null;
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


}
