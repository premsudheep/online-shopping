import { Component, OnInit } from '@angular/core';
import {ShoppingCartService} from 'shared/services/shopping-cart.service';
import {Observable, Subscription} from 'rxjs';
import {ShoppingCart} from 'shared/models/shopping-cart';

@Component({
  selector: 'shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.scss']
})
export class ShoppingCartComponent implements OnInit {

  subscription: Subscription | undefined;
  cart: any = {};
  constructor(private cartService: ShoppingCartService) { }

  async ngOnInit(): Promise<void> {
    this.subscription = (await this.cartService.getCart()).subscribe(cart => {
      this.cart = cart;
      console.log(cart);
    });
  }

  clearCart(): void {
    this.cartService.clearCart();
  }

}
