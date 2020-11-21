import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TaskTemplate } from './task.template';

import { ReactiveFormsModule } from '@angular/forms';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';


@NgModule({
  declarations: [TaskTemplate],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatInputModule
  ],
  exports: [TaskTemplate]
})
export class TaskModule { }
