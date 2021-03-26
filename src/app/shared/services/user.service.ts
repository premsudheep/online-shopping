import { Injectable } from '@angular/core';
import {AngularFireDatabase, AngularFireObject} from '@angular/fire/database';
import firebase from 'firebase';
import {AppUser} from 'shared/models/app-user';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';

@Injectable()
export class UserService {

  constructor(private db: AngularFireDatabase) { }

  save(user: firebase.User): void {
    this.db.object('/users/' + user.uid).update({
      name: user.displayName,
      email: user.email
    });
  }

  get(uid: string): Observable<any> {
    return this.db.object('/users/' + uid).valueChanges();
  }
}
