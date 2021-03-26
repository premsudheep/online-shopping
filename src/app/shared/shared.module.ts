import { CommonModule, CurrencyPipe, DatePipe } from '@angular/common';
import { NgModule } from '@angular/core';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CustomFormsModule } from 'ng2-validation';

import { ProductCardComponent } from './components/product-card/product-card.component';
import { ProductQuantityComponent } from './components/product-quantity/product-quantity.component';
import { AuthGuard } from './services/auth-guard.service';
import { AuthService } from './services/auth.service';
import { CategoryService } from './services/category.service';
import { OrderService } from './services/order.service';
import { ProductService } from './services/product.service';
import { ShoppingCartService } from './services/shopping-cart.service';
import { UserService } from './services/user.service';
import { InputFormatDirective } from './directives/input-format.directive';
import {SummaryPipe} from 'shared/pipes/summary.pipe';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';

@NgModule({
  declarations: [
    ProductCardComponent,
    ProductQuantityComponent,
    InputFormatDirective,
    SummaryPipe
  ],
  imports: [
    CommonModule,
    FormsModule,
    CustomFormsModule,
    // DataTableModule,
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    NgbModule,
  ],
  exports: [
    CommonModule,
    ProductCardComponent,
    ProductQuantityComponent,
    FormsModule,
    CustomFormsModule,
    // DataTableModule,
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    NgbModule,
  ],
  providers: [
    AuthService,
    AuthGuard,
    UserService,
    CategoryService,
    ProductService,
    ShoppingCartService,
    OrderService,
    CurrencyPipe,
    DatePipe
  ]
})
export class SharedModule { }
