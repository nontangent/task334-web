import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppService } from '@app/app.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss']
})
export class LoginPage implements OnInit {

  constructor(
    private router: Router,
    public appService: AppService
  ) { }

  ngOnInit(): void {
  }

  onBackButtonClick($event: any) {
    this.router.navigate(['/']);
  }

  onTwitterSignInButtonClick($event: any) {
    
    this.appService.auth.signInWithTwitter().then((success) => {
      console.debug('success:', success);
      this.router.navigate(['/']);
    }).catch((error) => {
      console.debug('error:', error);
    });

  } 

}
