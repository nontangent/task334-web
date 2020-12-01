import { Component, OnInit } from '@angular/core';
import { AppService } from '@app/app.service';

import * as models from '@task334/models';
import { filter, map, scan, switchMap, tap } from 'rxjs/operators';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'task334';

  tasks$ = this.app.auth.userId$.pipe(
    switchMap(userId => this.app.tasks.tasksChanges(userId)),
    filter(tasks => tasks.every(task => !!(task?.createdAt && task.updatedAt))),
    scan((pre: models.Task[], cur: models.Task[]) => Object.values({
        ...pre.reduce((p, n) => ({...p, [n.id]: n}), {}),
        ...cur.reduce((p, n) => ({...p, [n.id]: n}), {})
    }), []),
    map(tasks => tasks.filter((task: models.Task) => task.status === models.TaskStatus.WIP)),
    tap(tasks => console.debug('tasks:', tasks)),
    map((tasks: models.Task[]) => tasks.sort((a, b) => {
      return a.name.localeCompare(b.name)
    }))
  );

	constructor(
    public app: AppService
  ) { }

  ngOnInit() { }

	onTwitterLoginButtonClick() {
    this.app.auth.signInWithTwitter();
  }
  
  onTaskStatusChange([task, status]: [models.Task, models.TaskStatus]) {
    this.app.tasks.updateTask({...task, status: status});
  }

  onAddTaskButtonClick() {
    console.debug('add button is clicked.');
    this.app.router.navigate(['/', 'tasks', 'add']);
    console.debug('add button is clicked Ed.');
  }

  onTaskDblClick(task: models.Task) {
    this.app.router.navigate(['/', 'tasks', task.id]);
  }

  onSignOutButtonClick() {
    this.app.auth.signOut().then(() => {
      this.app.router.navigate(['/', 'login']);
    });
  }
}
