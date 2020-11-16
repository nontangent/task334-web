import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'templates-add-task',
  templateUrl: './add-task.template.html',
  styleUrls: ['./add-task.template.scss']
})
export class AddTaskTemplate implements OnInit {

  @Input()
  formGroup = this.fb.group({
    'taskName': ['']
  });

  @Output()
  onBackButtonClick = new EventEmitter();

  @Output()
  onAddButtonClick = new EventEmitter();

  constructor(
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
  }

}
