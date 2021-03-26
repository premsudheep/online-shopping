import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {AuthService} from 'shared/services/auth.service';
import {Observable} from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class AuthGuard implements CanActivate{

  constructor(private authService: AuthService, private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    // calling map instead of subscription will transform user$ object into boolean.
    // In this way Angular will internally subscribe to this observable and remove subscription later.
    return this.authService.user$
      .pipe(
        map(user => {
          if (user) { return true; }
          this.router.navigate(['/login'], {queryParams: { returnURL: state.url}});
          return false;
        })
      );
  }
}
