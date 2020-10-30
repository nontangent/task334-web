import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddTaskTemplate } from './add-task.template';

describe('AddTaskTemplate', () => {
  let component: AddTaskTemplate;
  let fixture: ComponentFixture<AddTaskTemplate>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddTaskTemplate ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddTaskTemplate);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
