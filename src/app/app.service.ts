import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { 
  AuthService, 
  SnackBarService, 
  TasksService 
} from '@services';
import { FormBuilder } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  constructor(
    public router: Router,
    public auth: AuthService,
    public form: FormBuilder,
    public snackBar: SnackBarService,
    public tasks: TasksService
  ) { }

}
