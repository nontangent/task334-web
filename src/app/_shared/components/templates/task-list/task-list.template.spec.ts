import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskListTemplate } from './task-list.template';

describe('TaskListTemplate', () => {
  let component: TaskListTemplate;
  let fixture: ComponentFixture<TaskListTemplate>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TaskListTemplate ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TaskListTemplate);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
