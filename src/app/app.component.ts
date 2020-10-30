import { Component } from '@angular/core';
import { AppService } from '@app/app.service';

import * as models from '@models';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'task334';

  tasks$ = this.app.auth.userId$.pipe(
    switchMap(userId => this.app.tasks.getTasks(userId))
  );

	constructor(
    public app: AppService
  ) {  }

	onTwitterLoginButtonClick() {
    this.app.auth.signInWithTwitter();
  }
  
  onTaskStatusChange([task, status]: [models.Task, models.TaskStatus]) {
    this.app.tasks.updateTask({...task, status: status});
  }
}
