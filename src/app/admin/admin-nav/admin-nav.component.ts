import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/shared/services/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-admin-nav',
  templateUrl: './admin-nav.component.html',
  styleUrls: ['./admin-nav.component.scss']
})
export class AdminNavComponent implements OnInit {
  public isCollapsed: boolean = false;
  public showNav: boolean = false;
  private subscription = new Subscription();
  constructor(private authService: AuthService) {
    this.subscription = this.authService.isLoggedIn().subscribe(value => {
      this.showNav = value;
    })
  }

  ngOnInit(): void {
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  signOut() {
    this.authService.signOut();
  }

}
