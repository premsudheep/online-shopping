import { DatePipe } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'shared/shared.module';

import { AdminOrdersComponent } from './components/admin-orders/admin-orders.component';
import { AdminProductsComponent } from './components/admin-products/admin-products.component';
import { ProductFormComponent } from './components/product-form/product-form.component';
import { AdminAuthGuard } from './services/admin-auth-guard.service';



@NgModule({
  imports: [
    RouterModule,
    SharedModule,
    // DataTableModule, // https://www.npmjs.com/package/angular-4-data-table used for table operations like pagination, sorting etc
  ],
  declarations: [
    ProductFormComponent,
    AdminProductsComponent,
    AdminOrdersComponent
  ],
  providers: [
    AdminAuthGuard
  ]
})
export class AdminModule { }
