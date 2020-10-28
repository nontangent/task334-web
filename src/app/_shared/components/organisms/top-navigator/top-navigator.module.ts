import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TopNavigatorOrganism } from './top-navigator.organism';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatDividerModule } from '@angular/material/divider';
import {
  Task334IconModule,
  Task334LogoModule
} from '@components/atoms';

@NgModule({
  declarations: [TopNavigatorOrganism],
  imports: [
    CommonModule,
    MatToolbarModule,
    MatDividerModule,
    Task334IconModule,
    Task334LogoModule
  ],
  exports: [TopNavigatorOrganism]
})
export class TopNavigatorModule { }
