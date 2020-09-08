import { Component } from '@angular/core';
import { FirebaseService } from './services';
import { AppService } from '@app/app.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'task334';

	constructor(
    public appService: AppService
  ) {  }

	onTwitterLoginButtonClick() {
    this.appService.auth.signInWithTwitter()
	}
}
