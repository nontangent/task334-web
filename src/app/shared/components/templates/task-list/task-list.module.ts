import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TaskListTemplate } from './task-list.template';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';
import { MatDividerModule } from '@angular/material/divider';
import { MatRippleModule } from '@angular/material/core';

@NgModule({
  declarations: [TaskListTemplate],
  imports: [
    CommonModule,
    MatToolbarModule,
    MatListModule,
    MatDividerModule,
    MatRippleModule
  ],
  exports: [TaskListTemplate]
})
export class TaskListModule { }
