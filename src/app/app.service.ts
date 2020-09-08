import { Injectable } from '@angular/core';
import { AuthService } from '@services/auth/auth.service';
import { Router } from '@angular/router';

import * as operators from 'rxjs/operators';
import { TasksService } from '@services/tasks/tasks.service';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  constructor(
    private router: Router,
    public auth: AuthService,
    public tasks: TasksService
  ) {
    this.doesFirebaseDataExist().then(() => {
      return this.isLoggedIn();
    }).then((idToken) => {
      console.info('firebase user data is detected.')
    }).catch(() => {
      console.info('firebase user data is not detected.')
      this.router.navigate(['/login']);
    })

  }

  isLoggedIn(): Promise<string> {
    return new Promise((resolve, reject) => {
      this.auth.firebaseUser$.pipe(
        operators.take(1)
      ).subscribe((firebaseUser: any) => {
        firebaseUser.getIdToken(true).then((idToken: string) => {
          resolve(idToken);
        }).catch(() => {
          reject();
        })
      })
    });
  }

  doesFirebaseDataExist(): Promise<boolean> {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open("firebaseLocalStorageDb", 1);
      request.onsuccess = (event: any) => {
        const db = event.target.result;
  
        console.debug('db:', db);
  
        const transaction = db.transaction(["firebaseLocalStorage"]);
        const objItem = transaction.objectStore("firebaseLocalStorage");
  
        objItem.openCursor().onsuccess = (event: any) => {
          event.target.result ? resolve() : reject();
        }
  
      }
    })
  }
}
