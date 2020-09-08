import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'templates-login',
  templateUrl: './login.template.html',
  styleUrls: ['./login.template.scss']
})
export class LoginTemplate implements OnInit {

  @Output()
  onBackButtonClick = new EventEmitter();

  @Output()
  onTwitterSignInButtonClick = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

}
