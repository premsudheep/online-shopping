import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from 'app/app-routing.module';
import { SharedModule } from 'shared/shared.module';

import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { NavbarComponent } from './components/navbar/navbar.component';

@NgModule({
  imports: [
    RouterModule,
    AppRoutingModule,
    SharedModule
  ],
  declarations: [
    NavbarComponent,
    HomeComponent,
    LoginComponent
  ],
  exports: [
    NavbarComponent
  ]
})
export class CoreModule { }
