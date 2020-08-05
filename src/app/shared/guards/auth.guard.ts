import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  private auth: boolean = false;

  constructor(
    private router: Router,
    private authService: AuthService
  ) {
    //subscribe to observable
    //
    this.authService.isLoggedIn().subscribe(value => {
      this.auth = value;
    });
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const url = state.url.toString();
    //auth logic
    //
    if (this.auth) {
      //authorized
      //
      console.log({ 'access-attempt-date': new Date(), 'url':url, 'authorized': this.auth });
      return true;
    } else {
      //not authorized
      //
      console.log({ 'access-attempt-date': new Date(), 'url':url, 'authorized': this.auth });
      this.router.navigate(['/admin/login']);
      return false;
    };
  }
}
