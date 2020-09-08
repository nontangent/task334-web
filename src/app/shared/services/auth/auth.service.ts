import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import * as firebase from 'firebase';

import { Observable, combineLatest, of } from "rxjs";
import * as operators from 'rxjs/operators';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  firebaseUser$: any = this.fireAuth.authState.pipe(
    operators.filter((user) => user?.uid ? true : false)
  );

  user$: Observable<any> = this.firebaseUser$.pipe(
    operators.switchMap((user: any) => {
      return combineLatest(
        of(user.uid),
        this.firestore.collection('users').doc(user.uid).valueChanges()
      )
    }),
    operators.map(([id, user]) => {
      return {
        ...user,
        id: id
      }
    })
  );

  constructor(
    private fireAuth: AngularFireAuth,
    private firestore: AngularFirestore,
    @Inject(PLATFORM_ID) private platform: Object
  ) {
    
    if (isPlatformBrowser(this.platform)) {
			firebase.auth().getRedirectResult().then(result => {
        if (!result?.user) {
          return 
        }

        console.log('result:', result);
        this.saveTwitter({
          uid: result?.user?.uid,
          id: (result?.additionalUserInfo as any)?.profile?.id_str,
          accessToken: (result?.credential as any)?.accessToken,
          secret: (result?.credential as any)?.secret
        });
        
      })
    }
    
  }

  signInWithTwitter() {
    const provider = new firebase.auth.TwitterAuthProvider();
    return firebase.auth().signInWithPopup(provider)
  }

  saveTwitter(params: {uid: string, id: string, accessToken: string, secret: string}) {
    this.firestore.collection(`users`).doc(params.uid).set({
      twitter: {
        id: params.id,
        accessToken: params.accessToken,
        secret: params.secret
      },
    }, {merge: true});
    console.debug('save twitter finished')
  }
  
}
