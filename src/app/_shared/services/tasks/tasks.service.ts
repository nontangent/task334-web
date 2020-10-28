import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AuthService } from '../auth/auth.service';
import * as operators from 'rxjs/operators';
import * as models from '@models';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TasksService {

  tasks$: Observable<models.Task[]> = this.auth.userId$.pipe(
    operators.switchMap((userId: string) => {
      return this.firestore.collection('users').doc(userId).collection('tasks', (r) => {
        return r.where('status', '==', models.TaskStatus.WIP).orderBy('createdAt')
      }).snapshotChanges();
    }),
    operators.map((changes) => {
      return changes.map((c) => {
        return {
          id: c.payload.doc.id,
          ...(c.payload.doc.data() as Object)
        } as models.Task;
      })
    })
  );

  constructor(
    private auth: AuthService,
    private firestore: AngularFirestore
  ) { }

}
