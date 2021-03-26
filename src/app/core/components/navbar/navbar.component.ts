import { Component, OnInit } from '@angular/core';
import {AuthService} from 'shared/services/auth.service';
import {AppUser} from 'shared/models/app-user';
import {ShoppingCartService} from 'shared/services/shopping-cart.service';
import {ShoppingCart, ShoppingCartItem} from 'shared/models/shopping-cart';
import {Observable} from 'rxjs';

@Component({
  selector: 'navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit{

  appUser: AppUser | undefined;
  cart$: Observable<ShoppingCart | any> | any;
  totalItemsCount = 0;

  constructor(private authService: AuthService, private cartService: ShoppingCartService) {}

  logout(): void {
    this.authService.logout();
  }

  async ngOnInit(): Promise<void> {
    // its okay to not to close this subscription as this change should be reflected on template at any given time
    this.authService.appUser$.subscribe(appUser => this.appUser = appUser);
    this.cart$ = await this.cartService.getCart();
    this.cart$.subscribe((x: any) => this.totalItemsCount = x.totalItemsCount);
  }

}
