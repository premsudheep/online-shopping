import { Component } from '@angular/core';
import {OrderService} from 'shared/services/order.service';
import {Observable} from 'rxjs/';
import {Order} from 'shared/models/order';
import {AngularFireList} from '@angular/fire/database';

@Component({
  selector: 'admin-orders',
  templateUrl: './admin-orders.component.html',
  styleUrls: ['./admin-orders.component.scss']
})
export class AdminOrdersComponent {

  orders$: Observable<Order[]>;

  constructor(private orderService: OrderService) {
    this.orders$ = orderService.getOrders();
  }
}


