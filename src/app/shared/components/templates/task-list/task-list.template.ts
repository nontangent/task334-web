import { Component, OnInit, Input } from '@angular/core';
import * as models from '@models';

@Component({
  selector: 'templates-task-list',
  templateUrl: './task-list.template.html',
  styleUrls: ['./task-list.template.scss']
})
export class TaskListTemplate implements OnInit {

  @Input()
  tasks: models.Task[] = []

  constructor() { }

  ngOnInit(): void {
  }

}
