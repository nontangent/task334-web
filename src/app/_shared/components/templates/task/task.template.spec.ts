import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskTemplate } from './task.template';

describe('TaskTemplate', () => {
  let component: TaskTemplate;
  let fixture: ComponentFixture<TaskTemplate>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TaskTemplate ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TaskTemplate);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
