import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TaskListTemplate } from './task-list.template';

import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { MatDividerModule } from '@angular/material/divider';
import { MatRippleModule } from '@angular/material/core';
import { DragDropModule } from '@angular/cdk/drag-drop';

import {
  TopNavigatorModule
} from '@components/organisms';

@NgModule({
  declarations: [TaskListTemplate],
  imports: [
    CommonModule,
    MatIconModule,
    MatButtonModule,
    MatListModule,
    MatDividerModule,
    MatRippleModule,
    DragDropModule,
    TopNavigatorModule
  ],
  exports: [TaskListTemplate]
})
export class TaskListModule { }
