import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Task334LogoAtom } from './task334-logo.atom';

describe('Task334LogoAtom', () => {
  let component: Task334LogoAtom;
  let fixture: ComponentFixture<Task334LogoAtom>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Task334LogoAtom ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Task334LogoAtom);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
