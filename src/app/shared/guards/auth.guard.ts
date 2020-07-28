import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  private auth:boolean = false;
  constructor(
    private router: Router,
    private authService: AuthService
  ) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    //subscribe to observable
    //
    this.authService.isLoggedIn().subscribe(value => {
      this.auth = value;     
      console.log('auth-guard',new Date() + ' ' + this.auth);
    });
    //auth logic
    //
    if (this.auth == true) {
      return true;
    } else {
      // not logged in so redirect to login page with the return url
      //
      this.router.navigate(['/admin/login']);
      return false;
    };
  }
}
