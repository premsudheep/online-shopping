import {Component , OnInit} from '@angular/core';
import {ShoppingCartService} from 'shared/services/shopping-cart.service';
import {ShoppingCart} from 'shared/models/shopping-cart';
import {Subscription} from 'rxjs';
import {Observable} from 'rxjs/';

@Component({
  selector: 'check-out',
  templateUrl: './check-out.component.html',
  styleUrls: ['./check-out.component.scss']
})
export class CheckOutComponent implements OnInit {


  cartSubscription: Subscription | undefined;
  cart$: Observable<ShoppingCart> | undefined;

  constructor(private cartService: ShoppingCartService) { }

  async ngOnInit(): Promise<void> {
    // @ts-ignore
    this.cart$ = await this.cartService.getCart();
  }

}
