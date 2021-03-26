import {Component, Input } from '@angular/core';
import {ProductState} from 'shared/models/product';
import {ShoppingCartService} from 'shared/services/shopping-cart.service';
import {ShoppingCart} from 'shared/models/shopping-cart';

@Component({
  selector: 'product-quantity',
  templateUrl: './product-quantity.component.html',
  styleUrls: ['./product-quantity.component.scss']
})
export class ProductQuantityComponent {

  @Input() productState: ProductState | undefined;
  @Input() shoppingCart: ShoppingCart | undefined;

  constructor(private cartService: ShoppingCartService) { }

  addToCart(): void {
    this.cartService.addToCart(this.productState, this.shoppingCart);
  }

  removeFromCart(): void {
    this.cartService.removeFromCart(this.productState, this.shoppingCart);
  }

}
