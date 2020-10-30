import { Injectable } from '@angular/core';
import { AuthService } from '@services/auth/auth.service';
import { Router } from '@angular/router';

import * as operators from 'rxjs/operators';
import { TasksService } from '@services/tasks/tasks.service';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  constructor(
    public router: Router,
    public auth: AuthService,
    public tasks: TasksService
  ) { }

}
