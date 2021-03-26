import { Injectable } from '@angular/core';
import {AngularFireDatabase} from '@angular/fire/database';
import { Observable } from 'rxjs';
import {map} from 'rxjs/operators';
import {Product} from 'shared/models/product';

@Injectable()
export class ProductService {

  constructor(private db: AngularFireDatabase) { }

  create(product: any): void {
    this.db.list('/products').push(product);
  }

  /*getAll(): Observable<any> {
    // return this.db.list('/products').valueChanges(); // as this wont return the parent node key value
    // https://stackoverflow.com/questions/64375262/angular-firebase-cant-get-the-key-value-in-html
    return this.db.list('/products').snapshotChanges()
      .pipe(
        map(object => {
          return object;
        })
      );
  }*/

  getAll(): Observable<any> {
    // return this.db.list('/products').valueChanges(); // as this wont return the parent node key value
    // https://stackoverflow.com/questions/64375262/angular-firebase-cant-get-the-key-value-in-html
    return this.db.list('/products', ref => ref.orderByChild('category')).snapshotChanges()
      .pipe(
        map(object => {
          const productsNode: any[] = [];
          object.forEach(item => {
            productsNode.push({
              productId: item.key,
              product: {
                title: item.payload.child('title').val(),
                price: item.payload.child('price').val(),
                category: item.payload.child('category').val(),
                imageURL: item.payload.child('imageURL').val(),
              }
            });
          });
          return productsNode;
        })
      );
  }

  get(productId: string): Observable<any> {
    return this.db.object('/products/' + productId).valueChanges();
  }

  update(productId: string, product: Product): Promise<any> {
    return this.db.object('/products/' + productId).update(product);
  }

  delete(productId: string | null): Promise<any> {
    if (!productId) { return Promise.reject(); }
    return this.db.object('/products/' + productId).remove();
  }
}
