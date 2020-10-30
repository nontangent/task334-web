import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddTaskTemplate } from './add-task.template';



@NgModule({
  declarations: [AddTaskTemplate],
  imports: [
    CommonModule
  ],
  exports: [AddTaskTemplate]
})
export class AddTaskModule { }
