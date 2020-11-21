import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from "@angular/router";
import { redirectUnauthorizedTo, redirectLoggedInTo, canActivate } from '@services/auth-guard';

const redirectLoggedIn = canActivate(() => redirectLoggedInTo(['']));
const redirectUnauthorized = canActivate(() => redirectUnauthorizedTo(['login']));

export function addData(canActivate, data: {}) {
  return {
    ...canActivate,
    data: {
      ...canActivate.data,
      ...data
    }
  }
}

const routes: Routes = [
	{
		path: 'tasks/add',
    loadChildren: () => import('./task/task.module').then(m => m.TaskModule),
    ...addData(redirectUnauthorized, {animation: 'PopUpPage'})
  },
	{
		path: 'login',
    loadChildren: () => import('./login/login.module').then(m => m.LoginModule),
    ...addData(redirectLoggedIn, {animation: 'PopUpPage'})
	},
  {
    path: '',
    pathMatch: 'full',
		loadChildren: () => import('./index/index.module').then(m => m.IndexModule),
    ...addData(redirectUnauthorized, {animation: 'IndexPage'})
  },
  {
		path: 'tasks/:taskId',
    loadChildren: () => import('./task/task.module').then(m => m.TaskModule),
    ...addData(redirectUnauthorized, {animation: 'PopUpPage'})
	},
  {
    path: '**',
    redirectTo: ''
  }
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class PagesModule { }
