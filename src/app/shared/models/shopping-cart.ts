import { ProductState } from './product';

export class ShoppingCartItem {
  productId = '';
  title = '';
  imageURL = '';
  category = '';
  price = 0;
  quantity = 0;

  constructor(init?: Partial<ShoppingCartItem>) {
    Object.assign(this, init);
  }

  get totalItemPrice(): number {
    return this.price * this.quantity;
  }
}

export class ShoppingCart {

  items: ShoppingCartItem[] = [];

  constructor(private readonly itemsMap: { [productId: string]: ShoppingCartItem }, public dateCreated?: number) {
    this.itemsMap = itemsMap || {};
    for (const productId in itemsMap) {
      if (productId) {
        const item = itemsMap[productId];
        this.items.push(new ShoppingCartItem({ ...item, productId }));
      }
    }
  }

  get totalItemsCount(): number {
    let count = 0;
    for (const productId in this.itemsMap) {
      if (productId && this && this.itemsMap && this.itemsMap[productId]) {
        count += this.itemsMap[productId].quantity || 0;
      }
    }
    return count;
  }

  get totalCartPrice(): number {
    let sum = 0;
    this.items.forEach(item => sum += item.totalItemPrice);
    return sum;
  }

  getQuantity(productState: ProductState): number {
    console.log('productState', productState);
    let item;
    if (productState && productState.productId) {
      item = this.itemsMap[productState.productId];
    }
    return (item) ? item.quantity : 0;
  }
}
