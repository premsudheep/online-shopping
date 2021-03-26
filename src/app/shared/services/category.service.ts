import { Injectable } from '@angular/core';
import {AngularFireDatabase } from '@angular/fire/database';
import {Observable} from 'rxjs';

@Injectable()
export class CategoryService {

  constructor(private db: AngularFireDatabase) {}

  get categories(): Observable<any> {
    // queryFn is optional which will be sort results by name.
    // E.g. ref => ref.orderByChild('name').equalTo('place'))
    return this.db
      .list('/categories', ref => ref.orderByChild('name'))
      .valueChanges();
  }
}
