import {Component, Input } from '@angular/core';
import {ProductState} from 'shared/models/product';
import {ShoppingCartService} from 'shared/services/shopping-cart.service';
import {ShoppingCart, ShoppingCartItem} from 'shared/models/shopping-cart';

@Component({
  selector: 'product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss']
})
export class ProductCardComponent {

  @Input() productState: ProductState | undefined;
  @Input() showActions = true;
  @Input() shoppingCart: ShoppingCart | undefined;
  constructor(private cartService: ShoppingCartService) { }

  addToCart(): void {
    this.cartService.addToCart(this.productState, this.shoppingCart);
  }
}
