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
  ) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    //subscribe to observable
    //
    this.authService.isLoggedIn().subscribe(value => {
      this.auth = value;
      console.log('login-guard', new Date() + ' ' + this.auth);
    });
    //auth logic
    //
    if (this.auth == true) {
      // not logged in so redirect to login page with the return url
      //
      this.router.navigate(['/admin/panel']);
      return false;

    } else {
      return true;
    };
  }
}
