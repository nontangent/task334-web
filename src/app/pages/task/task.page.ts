import { Component, OnInit } from '@angular/core';
import { Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AppService } from '@app/app.service';

import * as models from '@task334/models';
import { combineLatest, Observable } from 'rxjs';
import { distinctUntilChanged, filter, map, switchMap } from 'rxjs/operators';

export enum Mode {
  ADD = 'ADD',
  DIVIDE = 'DIVIDE'
}

@Component({
  selector: 'app-task',
  templateUrl: './task.page.html',
  styleUrls: ['./task.page.scss']
})
export class TaskPage implements OnInit {

  Mode = Mode;
  mode: Mode = Mode.ADD;
  mode$: Observable<Mode> = this.route.paramMap.pipe(
    map(paramsMap => paramsMap.get('taskId')),
    map(taskId => taskId ? Mode.DIVIDE : Mode.ADD)
  );

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

  formGroup = this.app.form.group({
    'taskName': ['', Validators.required]
  });

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
  }

  onBackButtonClick() {
    history.back();
  }

  onSubmit() {
    if (this.formGroup.invalid || !this.userId) return;

    const str = this.formGroup.get('taskName').value;
    const tasks: models.Task[] = this.app.tasks.convertStrToTasks(str, this.userId);

    switch (this.mode) {
      case Mode.ADD: return this.addTasks(tasks);
      case Mode.DIVIDE: return this.divideTask(tasks);
    }
  }

  addTasks(tasks: models.Task[]) {
    this.app.tasks.addTasks(tasks).then(() => {
      this.formGroup.reset();
      history.back();
    });
  }

  divideTask(tasks: models.Task[]) {
    this.app.tasks.divideTask(this.task, tasks).then(() => {
      this.formGroup.reset();
      history.back();
    });
  }

}
