import { Component, OnInit } from '@angular/core';
import { AppService } from '@app/app.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss']
})
export class LoginPage implements OnInit {

  constructor(
    public app: AppService
  ) { }

  ngOnInit(): void {
  }

  onBackButtonClick() {
    this.app.router.navigate(['/']);
  }

  onTwitterSignInButtonClick() {
    
    this.app.auth.signInWithTwitter().then(() => {
      console.debug('Sign in success!');
      this.app.router.navigate(['/']);
    }).catch((error) => {
      console.error('Error:', error);
      this.app.snackBar.openSnackBar('サインインに失敗しました。');
      throw error;
    });

  } 

}
