import { Injectable } from '@angular/core';
import {AngularFireAuth} from '@angular/fire/auth';
import firebase from 'firebase';
import GoogleAuthProvider = firebase.auth.GoogleAuthProvider;
import {from, Observable, of} from 'rxjs';
import auth = firebase.auth;
import {ActivatedRoute} from '@angular/router';
import {map, switchMap} from 'rxjs/operators';
import {UserService} from 'shared/services/user.service';
import {AppUser} from 'shared/models/app-user';

@Injectable()
export class AuthService {

  user$: Observable<firebase.User>;

  constructor(private afAuth: AngularFireAuth, private route: ActivatedRoute, private userService: UserService) {
    // this way subscription will be closed automatically.
    // @ts-ignore
    this.user$ = afAuth.authState;
  }

  loginViaGoogle(): Observable<auth.UserCredential> {
    // Storing the returnURL in local storage which wont get lost after google authentication callback.
    // this value can be read in AppComponent after successful login
    const returnURL: string | null = this.route.snapshot.queryParamMap.get('returnURL') || '/';
    localStorage.setItem('returnURL', returnURL);
    // Implementing OAuth. Will redirect with OAuth providers like google, facebook, github etc.
    return from(this.afAuth.signInWithPopup(new auth.GoogleAuthProvider()));
  }

  logout(): Observable<void> {
    return from(this.afAuth.signOut());
  }

  get authenticated(): boolean {
    return this.user$ !== null;
  }

  get appUser$(): Observable<AppUser> {
    return this.user$
      .pipe(
        switchMap(user => {
          if (user) {
            return this.userService.get(user.uid);
          }
          return of(null);
        })
      );
  }

}
