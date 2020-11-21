import { Component, OnInit } from '@angular/core';
import { Validators } from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router';
import { AppService } from '@app/app.service';

import * as models from '@task334/models';
import { combineLatest, Observable } from 'rxjs';
import { distinctUntilChanged, filter, map, switchMap } from 'rxjs/operators';

export enum Mode {
  ADD = 'ADD',
  DIVIDE = 'DIVIDE',
  RENAME = 'RENAME'
}

@Component({
  selector: 'app-task',
  templateUrl: './task.page.html',
  styleUrls: ['./task.page.scss']
})
export class TaskPage implements OnInit {
  formGroup = this.app.form.group({
    'taskName': ['', Validators.required]
  });

  userId: string = null;
  userId$: Observable<string> = this.app.auth.userId$;

  taskId$: Observable<string> = this.route.paramMap.pipe(
    map(paramMap => paramMap.get('taskId')),
    filter(taskId => !!taskId),
    distinctUntilChanged()
  );

  task: models.Task = null;
  task$: Observable<models.Task> = combineLatest([this.userId$, this.taskId$]).pipe(
    switchMap(([userId, taskId]) => this.app.tasks.getTask(userId, taskId))
  );

  tasks: models.Task[] = [];
  tasks$: Observable<models.Task[]> = combineLatest([
    this.userId$,
    this.formGroup.get('taskName').valueChanges
  ]).pipe(
    map(([userId, str]: [string, string]) => this.app.tasks.convertStrToTasks(str, userId)),
    distinctUntilChanged((pre, cur) => JSON.stringify(pre) === JSON.stringify(cur))
  );

  Mode = Mode;
  mode: Mode = Mode.ADD;
  mode$: Observable<Mode> = combineLatest([
    this.tasks$,
    this.route.paramMap
  ]).pipe(
    map(([tasks, paramsMap]: [models.Task[], Params]) => {
      const taskId = paramsMap.get('taskId');
      return (!taskId) ? Mode.ADD
        : (tasks.length <= 1) ? Mode.RENAME
        : Mode.DIVIDE;
    })
  );

  constructor(
    public app: AppService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.userId$.subscribe(userId => this.userId = userId);
    this.mode$.subscribe(mode => this.mode = mode);
    this.task$.subscribe(task => {
      this.task = task;
      this.formGroup.get('taskName').setValue(task.name);
    });
    this.tasks$.subscribe(tasks => this.tasks = tasks);
  }

  onBackButtonClick() {
    history.back();
  }

  onSubmit() {
    if (this.formGroup.invalid || !this.userId) return;

    this.dealTask().then(() => {
      history.back();
    }).catch((error) => {
      this.app.snackBar.openSnackBar('エラーが発生しました。');
      throw error;
    });
  }

  dealTask(): Promise<void> {
    switch (this.mode) {
      case Mode.ADD: return this.app.tasks.addTasks(this.tasks);
      case Mode.DIVIDE: return this.app.tasks.divideTask(this.task, this.tasks);
      case Mode.RENAME: return this.app.tasks.renameTask(this.task, this.tasks?.[0]?.name)
    }
  }

}
