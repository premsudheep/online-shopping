import {ShoppingCart, ShoppingCartItem} from './shopping-cart';

export interface OrderDetails {
  name: string | undefined;
  addressLine1: string | undefined;
  addressLine2: string | undefined;
  city: string | undefined;
}

export class Order {
  datePlaced: number;
  items: any;

  constructor(public userId: string, public shipping: any, shoppingCart: ShoppingCart) {
    this.datePlaced = new Date().getTime();
    this.items = shoppingCart.items.map( (i: ShoppingCartItem) => {
      return {
        product: {
          title: i.title,
          imageURL: i.imageURL,
          price: i.price
        },
        quantity: i.quantity,
        totalPrice: i.totalItemPrice
      };
    });
  }

}
