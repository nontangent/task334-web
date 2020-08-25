import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Observable, BehaviorSubject, from, of } from 'rxjs';
import * as operators from 'rxjs/operators';
import * as firebase from 'firebase';
import { AngularFireAuth } from '@angular/fire/auth';
import { 
	AngularFirestore, 
	AngularFirestoreCollection 
} from '@angular/fire/firestore';


export interface Twitter {
	id: string,
	accessToken: string,
	secret: string
}

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {
  user$: any = this.fireAuth.authState;
  idToken: string;
  idToken$: Observable<string> = this.fireAuth.idToken;
  usersCollection$: AngularFirestoreCollection;

  twitter: Twitter = null;
  twitter$: BehaviorSubject<Twitter> = new BehaviorSubject<Twitter>(null);

	private redirectResult$: Observable<any>;

	constructor(
		private fireAuth: AngularFireAuth,
    private fireStore: AngularFirestore,
    @Inject(PLATFORM_ID) private platform: Object
	) { 
		if (isPlatformBrowser(this.platform)) {
			firebase.auth().getRedirectResult().then(result => {
        this.handleResponseResult(result)
      })
      
      this.usersCollection$ = this.fireStore.collection('users');
		}

		this.twitter$.subscribe((twitter) => {
      console.debug('twitter:', twitter);
      this.twitter = twitter;
    });

	}

	handleResponseResult(result) {
    console.debug('result:', result);
    if (result?.credential?.signInMethod){
      switch(result.credential.signInMethod) {
        case 'twitter.com': {
          this.handleTwitterResult(result);
        }
      }
    }

  }

	handleTwitterResult(result) {
    console.debug('handle twitter result');
    if (
      result?.credential?.accessToken &&
      result?.credential?.secret &&
      result?.user?.uid
    ) {
      this.saveTwitter({
				uid: result.user.uid,
				id: (result.additionalUserInfo as any).profile.id_str,
				accessToken: (result.credential as any).accessToken,
				secret: (result.credential as any).secret
      })
    }
  }


	signInWithTwitter() {
    const provider = new firebase.auth.TwitterAuthProvider();
    firebase.auth().signInWithRedirect(provider).then((success) => {
      console.debug('success:', success);
    }).catch(error => {
      console.debug('error:', error);
    })
  }

	saveTwitter(params: {uid: string, id: string, accessToken: string, secret: string}) {
    console.debug('params:', params);
    console.debug('usersCollection$:', this.usersCollection$);
    console.debug('this.fireAuth.authState:', this.fireAuth.authState);

    this.fireAuth.authState.pipe(
      operators.take(1)
    ).subscribe((user) => {
      console.debug('save twitter start')
      this.usersCollection$.doc(params.uid).set({
        twitter: {
					id: params.id,
          accessToken: params.accessToken,
          secret: params.secret
        },
      }, {merge: true});
      console.debug('save twitter finished')

    });

  }

  retrieveTwitter(uid: string): Observable<Twitter> {
    return this.usersCollection$.doc(uid).get().pipe(
      operators.map<any, Twitter>((user: any): Twitter => {
        console.debug('user:', user.data());
        return (user.exists && user?.data()?.twitter) ? user.data().twitter : null
      }),
      operators.catchError((error) => {
        console.error('error:', error);
        return of(null)
      }),
    )
  }

}
