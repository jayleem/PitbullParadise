import { Component, OnInit } from '@angular/core';
import { AdoptableService } from 'src/app/shared/services/adoptable.service';
import { AuthService } from 'src/app/shared/services/auth.service';
import { DbMessageService } from 'src/app/shared/services/db-message.service';

@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.scss']
})
export class AdminPanelComponent implements OnInit {
  delay: any;
  purging: boolean = false;
  dbStatus: boolean = false;
  //TO-DO
  //get server addr and api key from enviorment variables
  serverAddr: string = "http://localhost:3000/"
  apiKey: string = "abcdef12345"

  constructor(
    private adoptablesService: AdoptableService,
    private authService: AuthService,
    private dbMessageService: DbMessageService
  ) { }

  ngOnInit(): void {
    this.dbTestConnection()
  }

  dbTestConnection() {
    this.dbStatus = false;//reset dbstatus var
    setTimeout(() => {
      this.adoptablesService.getDogs("0", "1")
        .then(res => {
          if (res) {
            //server responded
            //
            this.dbStatus = true;
          } else {
            //server didn't respond
            this.dbStatus = false;
          }
        })
        .catch(err => {
          this.dbStatus = false;
        })
    }, 1000);
  }

  //start timeout
  //
  start() {
    clearTimeout(this.delay);
    this.purging = true;
    this.delay = setTimeout(() => { this.purgeDatabase() }, 30000);
  }

  //stop timeout
  //
  stop() {
    clearTimeout(this.delay);
    this.purging = false;
    console.log('process aborted'); //clears timeout
  }

  //purges the entire databse
  //
  purgeDatabase() {
    clearTimeout(this.delay);
    this.purging = false;
    this.adoptablesService.purgeDB().then(res => {
      this.dbMessageService.setMessage(res.message, res.type);
    });
  }

  //generates 25 documents each time the button is pressed
  //
  generateTestData() {
    this.adoptablesService.testDataDB().then(res => {
      this.dbMessageService.setMessage(res.message, res.type);
    });
  }

  onSignOut() {
    this.authService.signOut();
  }
}
