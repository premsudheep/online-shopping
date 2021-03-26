import {Injectable} from '@angular/core';
import {AngularFireDatabase, AngularFireObject} from '@angular/fire/database';
import firebase from 'firebase';
import {Product, ProductState} from 'shared/models/product';
import {map, take} from 'rxjs/operators';
import {Observable} from 'rxjs';
import {SnapshotAction} from '@angular/fire/database/interfaces';
import {ShoppingCart, ShoppingCartItem} from 'shared/models/shopping-cart';

@Injectable()
export class ShoppingCartService {

  constructor(private db: AngularFireDatabase) { }

  addToCart(productState: ProductState | undefined, cart: ShoppingCart | undefined): void {
    let item: Partial<ShoppingCartItem>;
    if (cart && productState && productState.productId) {

      // https://www.deadcoderising.com/2017-03-28-es6-destructuring-an-elegant-way-of-extracting-data-from-arrays-and-objects-in-javascript/
      const [first] = cart.items.filter((i: ShoppingCartItem) => i.productId === productState?.productId);

      // item not found in the existing cart
      if (!first) {
        item = {
          ...productState.product,
          productId: productState.productId
        };
      } else {
        item = { ...first, productId: productState?.productId };
      }
    }
    // @ts-ignore
    this.updateItem(item, 1);
  }

  removeFromCart(productState: ProductState | undefined, cart: ShoppingCart | undefined): void {
    let item;
    if (cart && productState && productState.productId) {
      // https://www.deadcoderising.com/2017-03-28-es6-destructuring-an-elegant-way-of-extracting-data-from-arrays-and-objects-in-javascript/
      const [first] = cart.items.filter((i: ShoppingCartItem) => i.productId === productState?.productId);
      item = { ...first, productId: productState?.productId };
    }
    // @ts-ignore
    this.updateItem(item, -1);
  }

  async getCart(): Promise<Observable<ShoppingCart | unknown>> {
    const cartId = await this.getOrCreateCartId();
    return this.db
      .object('/shopping-carts/' + cartId)
      .valueChanges()
      .pipe(
        map((x: any) => new ShoppingCart(x.items, x.dateCreated))
      );
  }

  async clearCart(): Promise<void> {
    const cartId = await this.getOrCreateCartId();
    return this.db.object('/shopping-carts/' + cartId + '/items/').remove();
  }

  private create(): firebase.database.ThenableReference {
    return this.db.list('/shopping-carts').push({
      dateCreated: new Date().getTime()
    });
  }

  private getCartItems(cartId: string | null, productId: string | null | undefined): Observable<any> {
    return this.db.object('/shopping-carts/' + cartId + '/items/' + productId).valueChanges();
  }

  private async getOrCreateCartId(): Promise<null | string> {
    const cartId = localStorage.getItem('cartId');
    if (cartId) { return cartId; }

    const result: firebase.database.Reference = await this.create();
    if (typeof result.key === 'string') {
      localStorage.setItem('cartId', result.key);
    }
    return result.key;
  }

  private async updateItem(cartItem: Partial<ShoppingCartItem>, change: number): Promise<void> {
    if (!cartItem) { return; }
    const cartId = await this.getOrCreateCartId();
    const items$: Observable<any> = this.getCartItems(cartId, cartItem.productId);
    items$.pipe(take(1))
      .subscribe((item: any) => {
        const quantity = ((item && item.quantity) || 0) + change;
        if (quantity === 0) {
          // remove item node from shopping cart
          this.db.object('/shopping-carts/' + cartId + '/items/' + cartItem.productId).remove();
        } else {
          // add or update the cart node
          this.db.object('/shopping-carts/' + cartId + '/items/' + cartItem.productId)
            .update({
              title: cartItem.title,
              imageURL: cartItem.imageURL,
              price: cartItem.price,
              category: cartItem.category,
              quantity
            });
        }
      });
  }

}
