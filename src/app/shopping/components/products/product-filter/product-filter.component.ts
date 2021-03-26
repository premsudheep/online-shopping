import {Component, Input, OnInit} from '@angular/core';
import {CategoryService} from 'shared/services/category.service';

@Component({
  selector: 'product-filter',
  templateUrl: './product-filter.component.html',
  styleUrls: ['./product-filter.component.scss']
})
export class ProductFilterComponent implements OnInit {


  @Input() category: any;

  categories$;

  constructor(private categoryService: CategoryService) {
    this.categories$ = this.categoryService.categories;
  }

  ngOnInit(): void {
  }

}
