import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubjectScheduledComponent } from './subject-scheduled.component';

describe('SubjectScheduledComponent', () => {
  let component: SubjectScheduledComponent;
  let fixture: ComponentFixture<SubjectScheduledComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SubjectScheduledComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SubjectScheduledComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
