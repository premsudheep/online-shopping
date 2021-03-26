import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {Order, OrderDetails} from 'shared/models/order';
import {Subscription} from 'rxjs';
import {AuthService} from 'shared/services/auth.service';
import {OrderService} from 'shared/services/order.service';
import {Router} from '@angular/router';
import {ShoppingCart} from 'shared/models/shopping-cart';

@Component({
  selector: 'shipping-form',
  templateUrl: './shipping-form.component.html',
  styleUrls: ['./shipping-form.component.scss']
})
export class ShippingFormComponent implements OnInit, OnDestroy {

  shipping: OrderDetails = {
    name: undefined,
    addressLine1: undefined,
    addressLine2: undefined,
    city: undefined,
  };

  userId = '';
  userSubscription: Subscription | undefined;

  @Input() cart: any;

  constructor(
    private orderService: OrderService,
    private authService: AuthService,
    private router: Router) { }

  ngOnInit(): void {
    this.userSubscription = this.authService.user$.subscribe(user => this.userId = user.uid);
  }

  async placeOrder(): Promise<void> {
    const order = new Order(this.userId, this.shipping, this.cart);
    const result = await this.orderService.placeOrder(order);
    this.router.navigate(['/order-success', result.key]);
  }

  ngOnDestroy(): void {
    if (this.userSubscription && !this.userSubscription.closed) {
      this.userSubscription.unsubscribe();
    }
  }

}
