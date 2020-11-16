import { Injectable } from '@angular/core';
import { AuthService } from '@services/auth/auth.service';
import { Router } from '@angular/router';

import { TasksService } from '@services/tasks/tasks.service';
import { FormBuilder } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  constructor(
    public router: Router,
    public auth: AuthService,
    public form: FormBuilder,
    public tasks: TasksService
  ) { }

}
