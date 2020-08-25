import { Component } from '@angular/core';
import { FirebaseService } from './services';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'task334';

	constructor(private firebaseService: FirebaseService) {  }

	onClickTwitterLoginButton() {
		this.firebaseService.signInWithTwitter();
	}
}
