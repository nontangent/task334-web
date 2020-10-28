import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Task334BannerMolecule } from './task334-banner.molecule';

describe('Task334BannerMolecule', () => {
  let component: Task334BannerMolecule;
  let fixture: ComponentFixture<Task334BannerMolecule>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Task334BannerMolecule ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Task334BannerMolecule);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
