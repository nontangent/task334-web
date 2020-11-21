import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { TaskPage } from './task.page';
import { TaskModule as TaskTemplateModule } from '@components/templates';

const routes: Routes = [
	{
		path: '',
		component: TaskPage,
		// loadChildren: () => import('./pages/pages.module').then(m => m.PagesModule)
	}
];

@NgModule({
  declarations: [TaskPage],
  imports: [
    CommonModule,
    TaskTemplateModule,
    RouterModule.forChild(routes)
  ],
  exports: [TaskPage]
})
export class TaskModule { }