import { Injectable } from '@angular/core';
import {AngularFireDatabase } from '@angular/fire/database';
import firebase from 'firebase';
import {ShoppingCartService} from 'shared/services/shopping-cart.service';
import {Observable} from 'rxjs/';

@Injectable()
export class OrderService {

  constructor(private db: AngularFireDatabase, private cartService: ShoppingCartService) {}

  async placeOrder(order: any): Promise<firebase.database.ThenableReference> {
    // below both calls has to be transactional
    const result = await this.db.list('/orders').push(order);
    this.cartService.clearCart();
    return result;
  }

  getOrders(): Observable<any[]> {
    return this.db.list('/orders').valueChanges();
  }

  getOrdersByUser(userId: string): Observable<any[]> {
    return this.db
      .list('/orders', ref => ref.orderByChild('userId').equalTo(userId))
      .valueChanges();
  }
}
