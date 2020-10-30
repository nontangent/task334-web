import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import * as firebase from 'firebase';

import { Observable, combineLatest, of } from "rxjs";
import { map, filter, switchMap, distinctUntilChanged } from 'rxjs/operators';
import { isPlatformBrowser } from '@angular/common';

import * as models from '@models';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  auth$: Observable<firebase.User> = this.fireAuth.authState.pipe(
    filter((user) => user?.uid ? true : false)
  );

  userId$: Observable<string> = this.auth$.pipe(
    map(auth => auth.uid),
    distinctUntilChanged()
  );

  constructor(
    private fireAuth: AngularFireAuth,
    private firestore: AngularFirestore,
    @Inject(PLATFORM_ID) private platform: Object
  ) {
    
    if (isPlatformBrowser(this.platform)) {
      this.fireAuth.getRedirectResult().then(result => {
        if (!result?.user) return;

        this.saveTwitter({
          uid: result?.user?.uid,
          id: (result?.additionalUserInfo as any)?.profile?.id_str,
          accessToken: (result?.credential as any)?.accessToken,
          secret: (result?.credential as any)?.secret
        });
        
      });
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
