import {Component, OnDestroy, OnInit} from '@angular/core';
import {ProductService} from 'shared/services/product.service';
import {Subscription} from 'rxjs';
// import {Product} from '../../../models/product';
// import {DataTableResource} from 'angular-4-data-table';

@Component({
  selector: 'admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.scss']
})
export class AdminProductsComponent implements OnInit, OnDestroy {

  products: any[] | undefined;
  filteredProducts: any[] | undefined;
  subscription: Subscription;
  /*tableResource: DataTableResource<any> | undefined;
  items: any[] = [];
  itemCount: number | undefined;*/

  constructor(private productService: ProductService) {
    this.subscription = this.productService
      .getAll()
      .subscribe(products => {
        this.filteredProducts = this.products = products;
        // this.initializeTable(products);
      });
  }

  /*private initializeTable(products: any[]): void {
    this.tableResource = new DataTableResource(products);
    this.tableResource
      .query({offset: 0})
      .then(items => this.items = items);
    this.tableResource
      .count()
      .then(count => this.itemCount = count);
  }

  reloadItems(params: any): void {
    if (!this.tableResource) { return; }
    this.tableResource
      .query(params)
      .then(items => this.items = items);
  }*/

  filter(query: string): void {
    this.filteredProducts = (query && this.products)
      ? this.products.filter(p =>
        p.product &&
        p.product.title &&
        p.product.title.toLowerCase().includes(query.toLowerCase()))
      : this.products;
  }

  ngOnInit(): void {}

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
