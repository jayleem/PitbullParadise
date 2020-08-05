import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate {
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
    if (this.auth == true) {
      // already logged in so redirect to the admin dashboard
      //
      console.log({ 'access-attempt-date': new Date(), 'url':url, 'authorized': this.auth });
      this.router.navigate(['/admin/panel']);
      return false;

    } else {
      //not logged in so allow the user to login
      //
      console.log({ 'access-attempt-date': new Date(), 'url':url, 'authorized': this.auth });
      return true;
    };
  }
}
