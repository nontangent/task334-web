import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginTemplate } from './login.template';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';



@NgModule({
  declarations: [LoginTemplate],
  imports: [
    CommonModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
  ],
  exports: [LoginTemplate]
})
export class LoginModule { }
