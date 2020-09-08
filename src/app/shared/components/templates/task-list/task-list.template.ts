import { Component, OnInit } from '@angular/core';

export interface Task {
  name: string;
}

@Component({
  selector: 'templates-task-list',
  templateUrl: './task-list.template.html',
  styleUrls: ['./task-list.template.scss']
})
export class TaskListTemplate implements OnInit {

  _tasks: Task[] = [
    {
      name: 'テスト'
    }
  ]

  get tasks() {
    return [...Array(10)].map((_, index) => {
      return {name: `Tast ${index}`}
    })
  }

  constructor() { }

  ngOnInit(): void {
  }

}
