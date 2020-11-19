import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import * as firebase from 'firebase/app';

import { Observable } from "rxjs";
import { map, filter, distinctUntilChanged } from 'rxjs/operators';
import * as models from '@task334/models';
import { M } from '@nontangent/firebase-model-utilities';

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
    private firestore: AngularFirestore
  ) { }

  signInWithTwitter() {
    const provider = new firebase.auth.TwitterAuthProvider();
    return firebase.auth().signInWithPopup(provider).then((result) => {
      const userId = result.user?.uid;
      if (!userId) return;

      const twitter: models.Twitter = {
        id: (result?.additionalUserInfo as any)?.profile?.id_str,
        accessToken: (result.credential as any)?.accessToken,
        secret: (result.credential as any)?.secret
      };

      if (result?.additionalUserInfo?.isNewUser) {
        return this.createUser({
          ...models.nullUser,
          id: userId,
          twitter: twitter
        });
      } else {
        return this.updateTwitter(userId, twitter);
      }

    });
  }

  signOut() {
    return this.fireAuth.signOut();
  }

  updateTwitter(userId, twitter: models.Twitter) {
    console.debug('updating twitter.');

    return this.firestore.doc(`users/${userId}`).set({
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
    }).toMoment(firebase.firestore).filterProps(fields).data();

    return this.firestore.doc(`users/${user.id}`).set(data); 
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
