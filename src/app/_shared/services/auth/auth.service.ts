import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import * as firebase from 'firebase/app';

import { Observable } from "rxjs";
import { map, filter, distinctUntilChanged } from 'rxjs/operators';
import * as models from '@task334/models';
import { M } from '@nontangent/firebase-model-utilities';
import { isPlatformBrowser } from '@angular/common';
import * as Sentry from "@sentry/angular";


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  auth$: Observable<firebase.User> = this.fireAuth.authState;

  userId$: Observable<string> = this.auth$.pipe(
    filter(auth => !!auth?.uid),
    map(auth => auth.uid),
    distinctUntilChanged()
  );

  constructor(
    private fireAuth: AngularFireAuth,
    private db: AngularFirestore,
    @Inject(PLATFORM_ID) private platform
  ) {
    if(isPlatformBrowser(this.platform)) {
      this.auth$.subscribe((auth) => {

        Sentry.configureScope((scope) => {
          const context = auth?.uid ? {id: auth?.uid} : {};
          scope.setUser(context);
        });

      });
    }
  }

  signInWithTwitter() {
    const provider = new firebase.auth.TwitterAuthProvider();
    return firebase.auth().signInWithPopup(provider).then((result) => {
      const userId = result.user?.uid;
      if (!userId) throw Error('User id is not detected.');

      const twitter: models.Twitter = {
        id: (result?.additionalUserInfo as any)?.profile?.id_str,
        accessToken: (result.credential as any)?.accessToken,
        secret: (result.credential as any)?.secret
      };
      return this.saveUser({id: userId, twitter: twitter});

    });
  }

  signOut() {
    return this.fireAuth.signOut();
  }

  saveUser(user: Partial<models.User>): Promise<void> {
    return this.db.doc(`users/${user.id}`).get().toPromise().then((doc) => {
      return doc.exists ? this.updateUser({
        ...models.nullUser,
        ...doc.data(),
        ...user
      }) : this.createUser({
        ...models.nullUser,
        ...user
      });
    });
  }

  updateTwitter(userId, twitter: models.Twitter) {
    console.debug('updating twitter.');

    return this.db.doc(`users/${userId}`).set({
      twitter: {
        id: twitter.id,
        accessToken: twitter.accessToken,
        secret: twitter.secret
      },
      updatedAt: firebase.firestore.FieldValue.serverTimestamp()
    }, {merge: true});
  }

  setUser(user: models.User) {
    const fields = ['latestTweetId', 'twitter', 'createdAt', 'updatedAt'];
    const data = new M({
      ...user,
      updatedAt: firebase.firestore.FieldValue.serverTimestamp()
    }).toTimestamp(firebase.firestore).filterProps(fields).data();

    return this.db.doc(`users/${user.id}`).set(data); 
  }

  createUser(user: models.User) {
    console.debug('creating user');
    return this.setUser({
      ...user,
      createdAt: firebase.firestore.FieldValue.serverTimestamp()
    });
  }

  updateUser(user: models.User) {
    return this.setUser({...user});
  }
  
}
