import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import {map, switchMap} from 'rxjs/operators';
import * as models from '@task334/models';
import { M, generateId } from '@nontangent/firebase-model-utilities';
import * as firebase from 'firebase/app';

export function parseUserId(path: string) {
  return path.match(/users\/(.*?)\//)[1];
}

@Injectable({
  providedIn: 'root'
})
export class TasksService {

  static readonly fields = ['name', 'status', 'createdAt', 'updatedAt'];

  constructor(
    private db: AngularFirestore
  ) { }

  private getTasksCollectionRef(userId: string) {
    return this.db.collection(`users/${userId}/tasks`, (r) => {
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
    const data = new M({
      ...task
    }).toTimestamp(firebase.firestore).filterProps(TasksService.fields).data();
    return this.db.doc(`users/${task.ownerId}/tasks/${task.id}`).set(data);
  }

  updateTask(task: models.Task): Promise<void> {
    return this._setTask({
      ...task,
      updatedAt: firebase.firestore.FieldValue.serverTimestamp()
    });
  }

  private _addTask(task: models.Task): Promise<any> {
    return this.db.collection(`users/${task.ownerId}/tasks`).add(new M({
      ...task,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      updatedAt: firebase.firestore.FieldValue.serverTimestamp()
    }).toTimestamp(firebase.firestore).filterProps(TasksService.fields).data());
  }

  addTask(task: models.Task): Promise<any> {
    return this._addTask({
      ...task,
      status: models.TaskStatus.WIP
    });
  }

  addTasks(tasks: models.Task[]): Promise<void> {
    const batch = this.db.firestore.batch();

    for (const task of tasks) {
      const ref = this.db.doc(`users/${task.ownerId}/tasks/${generateId()}`).ref;
      batch.set(ref, new M({
        ...task,
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
        updatedAt: firebase.firestore.FieldValue.serverTimestamp(),
      }).toTimestamp(firebase.firestore).filterProps(TasksService.fields).data());
    }

    return batch.commit();
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

  convertStrToTasks(str: string, ownerId: string) {
    const names: string[] = str.replace(/　/g, ' ') //全角スペースを半角スペースに変換
    .replace(/\s/g, ' ') //改行タグを削除
    .split(' ') // 半角スペースで分割
    .filter(c => c !== ''); //空白を削除

    return names.map(name => ({
      ...models.nullTask,
      ownerId: ownerId,
      name: name,
      status: models.TaskStatus.WIP
    }) as models.Task)
  }

}