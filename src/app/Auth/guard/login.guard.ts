import {CanActivate, Router} from '@angular/router';
import {Injectable} from '@angular/core';

@Injectable()
export class LoginGuard implements CanActivate {
  constructor(private router: Router) {}
  canActivate() {
    return this.checkLogin();
  }
  checkLogin() {
    if (localStorage.getItem('user') != null) {
      return true;
    }
    this.router.navigate(['/login']);
  }
}
