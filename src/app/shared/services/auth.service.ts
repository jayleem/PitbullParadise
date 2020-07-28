import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private loggedIn = new BehaviorSubject<boolean>(false);
  private user: any;
  constructor(
    private http: HttpClient,
    private router: Router
    ) { }

  //user sign in
  //
  signIn(username: string, password: string): Promise<any> {
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      })
    }

    return this.http.post(`/api/admin/login`, { username, password }, options)
      .toPromise()
      .then(res => {
        //user authorized
        //
        this.setSession(res);//set session
        this.isLoggedIn();//check token
        return true;
      })
      .catch(err => {
        //user not authorized
        //
        return false;
      })
  }

  setSession(authRes) {
    const token = authRes.bearer;
    const expiresAt = authRes.expiresIn;
    localStorage.setItem('id_token', token);
    localStorage.setItem("expires_at", expiresAt);
  }

  signOut() {
    localStorage.removeItem("id_token");
    localStorage.removeItem("expires_at");
    this.setLoggedIn(false);
    window.location.reload();
  }

  isLoggedIn(): Observable<boolean> {
    const d = new Date().getTime();
    const expiresAt = localStorage.getItem("expires_at");
    
    if (expiresAt) {
      d < parseInt(expiresAt) ? this.setLoggedIn(true) : this.setLoggedIn(false);
      return this.loggedIn.asObservable();
    } else {
      this.setLoggedIn(false);
      return this.loggedIn.asObservable();
    }
  }

  setLoggedIn(value: boolean) {
    return this.loggedIn.next(value);
  }
}
