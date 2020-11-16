import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import {map, switchMap} from 'rxjs/operators';
import * as models from '@models';
import { M } from '@nontangent/firebase-model-utilities';
import * as firebase from 'firebase/app';

export function parseUserId(path: string) {
  return path.match(/users\/(.*?)\//)[1];
}

@Injectable({
  providedIn: 'root'
})
export class TasksService {

  constructor(
    private firestore: AngularFirestore
  ) { }

  private getTasksCollectionRef(userId: string) {
    return this.firestore.collection(`users/${userId}/tasks`, (r) => {
      return r.where('status', '==', models.TaskStatus.WIP).orderBy('createdAt')
    });
  }

  tasksChanges(userId: string) {
    return this.getTasksCollectionRef(userId).snapshotChanges().pipe(
      map(snapshot => snapshot.map(action => new M({
        ...(action.payload.doc.data() as any),
        id: action.payload.doc.id,
        ownerId: parseUserId(action.payload.doc.ref.path)
      } as models.Task).toMoment(firebase.firestore).data()))
    );
  }

  getTasks(userId: string) {
    return this.getTasksCollectionRef(userId).get().pipe(
      map(snapshot => snapshot.docs.map(doc => new M({
        ...(doc.data() as any),
        id: doc.id,
        ownerId: parseUserId(doc.ref.path)
      } as models.Task).toMoment(firebase.firestore).data()))
    )
  }

  private _setTask(task: models.Task): Promise<void> {
    const fields = ['name', 'status', 'createdAt', 'updatedAt'];
    const data = new M({
      ...task
    }).toTimestamp(firebase.firestore).filterProps(fields).data();
    return this.firestore.doc(`users/${task.ownerId}/tasks/${task.id}`).set(data);
  }

  updateTask(task: models.Task): Promise<void> {
    return this._setTask({
      ...task,
      updatedAt: models.FieldValue.serverTimestamp()
    });
  }

  private _addTask(task: models.Task): Promise<any> {
    const fields = ['name', 'status', 'createdAt', 'updatedAt'];
    return this.firestore.collection(`users/${task.ownerId}/tasks`).add(new M({
      ...task,
      createdAt: models.FieldValue.serverTimestamp(),
      updatedAt: models.FieldValue.serverTimestamp()
    }).toTimestamp(firebase.firestore).filterProps(fields).data());
  }

  addTask(task: models.Task): Promise<any> {
    return this._addTask({
      ...task,
      status: models.TaskStatus.WIP
    });
  }


  doneTask(task: models.Task): Promise<void> {
    return this.updateTask({
      ...task,
      status: models.TaskStatus.DONE
    });
  }

  leftTask(task: models.Task): Promise<void> {
    return this.updateTask({
      ...task,
      status: models.TaskStatus.LEFT
    });
  }

}
