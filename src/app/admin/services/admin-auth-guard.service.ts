import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot} from '@angular/router';
import {AuthService} from 'shared/services/auth.service';
import {Observable, of} from 'rxjs';
import {map, switchMap} from 'rxjs/operators';
import {UserService} from 'shared/services/user.service';
import firebase from 'firebase';

@Injectable()
export class AdminAuthGuard implements CanActivate{

  constructor(private authService: AuthService, private userService: UserService) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    // @ts-ignore
    return this.authService.appUser$
      .pipe(
        map(appUser => appUser.isAdmin)
      );
  }
}
