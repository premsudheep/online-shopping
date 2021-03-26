import { Component } from '@angular/core';
import {AngularFireAuth} from '@angular/fire/auth';
import {AuthService} from 'shared/services/auth.service';
import {Router} from '@angular/router';
import {UserService} from 'shared/services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(private auth: AuthService, private router: Router, private userService: UserService) {
    auth.user$.subscribe(user => {
      if (!user) { return; }
      this.userService.save(user);
      const returnURL: string | null = localStorage.getItem('returnURL');
      if (!returnURL) { return; }
      localStorage.removeItem('returnURL');
      router.navigateByUrl(returnURL);
    });
  }
}
