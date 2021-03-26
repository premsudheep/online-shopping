import { Component, OnInit } from '@angular/core';
import {CategoryService} from 'shared/services/category.service';
import {ProductService} from 'shared/services/product.service';
import {ActivatedRoute, Router} from '@angular/router';
import {take} from 'rxjs/operators';
import {Product, ProductState} from 'shared/models/product';

@Component({
  selector: 'product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.scss']
})
export class ProductFormComponent implements OnInit {

  categories$;
  productState: ProductState = {
    productId: '',
    product: {
      title: '',
      price: 0,
      category: '',
      imageURL: ''
    }
  };
  id: string | null;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private categoryService: CategoryService,
    private productService: ProductService) {

    this.categories$ = categoryService.categories;
    this.id = this.route.snapshot.paramMap.get('id');
    if (this.id) {
      this.productService
        .get(this.id)
        .pipe(
          take(1) // unsubscribes after receiving once (first time)
        )
        .subscribe(p => {
          this.productState.product = p;
          this.productState.productId = this.id;
        });
    }
  }

  ngOnInit(): void {
  }

  save(product: any): void {
    if (this.id) {
      this.productService.update(this.id, product);
    } else {
      this.productService.create(product);
    }
    this.router.navigate(['/admin/products']);
  }

  delete(): void {
    if (!confirm('Are you sure want to delete this product?')) { return; }
    this.productService.delete(this.id);
    this.router.navigate(['/admin/products']);
  }

}
