import { Component, OnInit } from '@angular/core';
import {AuthService} from 'shared/services/auth.service';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
  }

  login(): any {
    // Implementing OAuth. Will redirect with OAuth providers like google, facebook, github etc.
    this.authService.loginViaGoogle();
  }

}
