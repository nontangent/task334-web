import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'templates-task',
  templateUrl: './task.template.html',
  styleUrls: ['./task.template.scss']
})
export class TaskTemplate implements OnInit {

  @Input()
  submitButtonValue: string = 'ADD';

  @Input()
  formGroup = this.fb.group({
    'taskName': ['']
  });

  @Output()
  onBackButtonClick = new EventEmitter();

  @Output()
  onSubmit = new EventEmitter();

  constructor(
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
  }
}
