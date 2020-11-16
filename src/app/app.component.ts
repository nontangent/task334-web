import { isPlatformBrowser } from '@angular/common';
import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { AppService } from '@app/app.service';

import * as models from '@models';
import { filter, map, scan, switchMap, tap } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'task334';

  tasks$ = this.app.auth.userId$.pipe(
    switchMap(userId => this.app.tasks.tasksChanges(userId)),
    filter(tasks => tasks.every(task => !!(task?.createdAt && task.updatedAt))),
    scan((pre: models.Task[], cur: models.Task[]) => {
      return pre.concat(cur.filter(t => !pre.map(t => t.id).includes(t.id)));
    }, []),
    tap(tasks => console.debug('tasks:', tasks)),
    map((tasks: models.Task[]) => tasks.sort((a, b) => {
      return (a.createdAt as moment.Moment).diff(b.createdAt as moment.Moment);
    }))
  );

	constructor(
    public app: AppService
  ) { }

	onTwitterLoginButtonClick() {
    this.app.auth.signInWithTwitter();
  }
  
  onTaskStatusChange([task, status]: [models.Task, models.TaskStatus]) {
    this.app.tasks.updateTask({...task, status: status});
  }

  onAddButtonClick() {
    console.debug('add button is clicked.');
    this.app.router.navigate(['/', 'add']);
    console.debug('add button is clicked Ed.');

  }
}
