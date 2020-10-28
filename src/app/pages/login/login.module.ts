import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { LoginPage } from './login.page';

import { OverlayModule } from '@components/frames';
import { LoginModule as LoginTemplateModule } from '@components/templates';

const routes: Routes = [
	{
		path: '',
		component: LoginPage,
		// loadChildren: () => import('./pages/pages.module').then(m => m.PagesModule)
	}
];

@NgModule({
  declarations: [LoginPage],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    LoginTemplateModule,
    OverlayModule
  ],
  exports: [LoginPage]
})
export class LoginModule { }