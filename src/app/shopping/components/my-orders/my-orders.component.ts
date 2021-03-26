import { Component } from '@angular/core';
import {AuthService} from 'shared/services/auth.service';
import {OrderService} from 'shared/services/order.service';
import {switchMap} from 'rxjs/operators';
import {Observable} from 'rxjs/';
import {Order} from 'shared/models/order';

@Component({
  selector: 'my-orders',
  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.scss']
})
export class MyOrdersComponent {

  orders$: Observable<Order[]>;

  constructor(
    private authService: AuthService,
    private orderService: OrderService) {
    this.orders$ = authService.user$.pipe(switchMap(u => orderService.getOrdersByUser(u.uid)));
  }
}
