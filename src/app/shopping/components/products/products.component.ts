import {Component, OnDestroy, OnInit} from '@angular/core';
import {ProductService} from 'shared/services/product.service';
import {ActivatedRoute} from '@angular/router';
import {switchMap} from 'rxjs/operators';
import {ProductState} from 'shared/models/product';
import {ShoppingCartService} from 'shared/services/shopping-cart.service';
import {Observable, Subscription} from 'rxjs';
import {ShoppingCart} from 'shared/models/shopping-cart';

@Component({
  selector: 'products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit, OnDestroy {

  products: ProductState[] = [];
  filteredProducts: any[] = [];
  category: string | null | undefined;
  cart: any;
  subscription: Subscription | undefined;
  cart$: Observable<ShoppingCart> | undefined;


  constructor(private productService: ProductService,
              private route: ActivatedRoute,
              private cartService: ShoppingCartService) {
  }

  async ngOnInit(): Promise<void> {
    // @ts-ignore
    this.cart$ = (await this.cartService.getCart());
    this.populateProducts();
  }

  private populateProducts(): void {
    this.productService
      .getAll()
      .pipe(
        switchMap(products => {
          this.products = products;
          return this.route.queryParamMap;
        })
      )
      // cannot use route.snapshot.queryParamMap as the params are coming from DOM and angular is not initialize a new/updated DOM
      .subscribe(params => {
        this.category = params.get('category');
        this.applyFilter();
      });
  }

  private applyFilter(): void {
    this.filteredProducts = (this.category && this.products && this.products)
      ? this.products.filter(p =>
        this.category &&
        p.product &&
        p.product.category &&
        p.product.category.toLowerCase().includes(this.category.toLowerCase()))
      : this.products;
  }

  ngOnDestroy(): void {
    if (this.subscription && !this.subscription.closed) {
      this.subscription.unsubscribe();
    }
  }
}
