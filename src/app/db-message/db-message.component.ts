import { Component, OnInit } from '@angular/core';
import { DbMessageService } from '../shared/services/db-message.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-db-message',
  templateUrl: './db-message.component.html',
  styleUrls: ['./db-message.component.scss']
})
export class DbMessageComponent implements OnInit {
  public message$: any;
  private subscription: Subscription;

  constructor(private dbMessageService: DbMessageService) { }

  //get messages from db service
  //
  ngOnInit() {
    this.subscription = this.dbMessageService
      .getMessage()
      .subscribe(value => {
        this.message$ = value;
        setTimeout(() => { this.message$ = '' }, 3000); //after 3 seconds message goes away
      })
  }

  //unsubscribe when component is destroyed
  //
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
