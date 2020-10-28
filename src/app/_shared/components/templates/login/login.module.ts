import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginTemplate } from './login.template';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

import {
  Task334BannerModule
} from '@components/molecules';

@NgModule({
  declarations: [LoginTemplate],
  imports: [
    CommonModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    Task334BannerModule
  ],
  exports: [LoginTemplate]
})
export class LoginModule { }
