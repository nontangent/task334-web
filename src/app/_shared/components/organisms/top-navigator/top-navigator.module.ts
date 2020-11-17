import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TopNavigatorOrganism } from './top-navigator.organism';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
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
    MatButtonModule,
    MatIconModule,
    Task334IconModule,
    Task334LogoModule
  ],
  exports: [TopNavigatorOrganism]
})
export class TopNavigatorModule { }
