import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class HttpInterceptorService {

  constructor(public auth: AuthService) { }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const idToken = localStorage.getItem("id_token");
    if (idToken) {
      req = req.clone({
        setHeaders: {
          Authorization: 'Bearer' + ' ' + idToken
        }
      });
      return next.handle(req);
    } else {
      return next.handle(req);
    }
  }
}