import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Task334IconAtom } from './task334-icon.atom';

describe('Task334IconAtom', () => {
  let component: Task334IconAtom;
  let fixture: ComponentFixture<Task334IconAtom>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Task334IconAtom ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Task334IconAtom);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
