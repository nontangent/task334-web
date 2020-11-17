import { Component, OnInit } from '@angular/core';
import { Validators } from '@angular/forms';
import { AppService } from '@app/app.service';

import * as models from '@models';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-task',
  templateUrl: './task.page.html',
  styleUrls: ['./task.page.scss']
})
export class TaskPage implements OnInit {

  userId: string = null;
  userId$: Observable<string> = this.app.auth.userId$;

  formGroup = this.app.form.group({
    'taskName': ['', Validators.required]
  });

  constructor(
    public app: AppService
  ) { }

  ngOnInit(): void {
    this.userId$.subscribe(userId => this.userId = userId);
  }

  onBackButtonClick() {
    history.back();
  }

  onAddButtonClick() {
    if (this.formGroup.invalid || !this.userId) return;

    const str = this.formGroup.get('taskName').value;
    const tasks = this.app.tasks.convertStrToTasks(str, this.userId);

    this.app.tasks.addTasks(tasks).then(() => {
      this.formGroup.reset();
      history.back();
    });
  }

}
