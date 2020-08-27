import { Component, OnInit } from '@angular/core';
import { AdoptableService } from 'src/app/shared/services/adoptable.service';
import { AuthService } from 'src/app/shared/services/auth.service';
import { DbMessageService } from 'src/app/shared/services/db-message.service';
import { Title, Meta } from '@angular/platform-browser';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.scss']
})
export class AdminPanelComponent implements OnInit {
  public delay: any;
  public countdown: any;
  public purging: boolean = false;
  public dbStatus: boolean = false;

  private title: string = "Pitbull Paradise | Admin Panel";
  private metaDesc: string = "";
  private robots: string = "NOINDEX, NOFOLLOW"
  private author: string = "github.com/jayleem"

  private subscriptions: Subscription[] = [];
  constructor(
    private adoptablesService: AdoptableService,
    private titleService: Title,
    private metaService: Meta,
    private authService: AuthService,
    private dbMessageService: DbMessageService
  ) { }

  ngOnInit(): void {
    //test connection
    //
    this.dbTestConnection();
    //set title and update meta tags
    //
    this.titleService.setTitle(this.title);
    this.metaService.updateTag({ name: 'description', content: this.metaDesc });
    this.metaService.updateTag({ name: 'robots', content: this.robots });
    this.metaService.updateTag({ name: 'author', content: this.author });
  }

  dbTestConnection() {
    setTimeout(() => {
      this.adoptablesService.isConnected().then(res => {
        if (res.status == '200') {
          this.dbStatus = true;
        }
        else {
          this.dbStatus = false;
        }
      });
    }, 1000);
  }

  //start timeout
  //
  start() {
    //new purge database delay
    //
    clearTimeout(this.delay);
    this.purging = true;
    this.delay = setTimeout(() => { this.purgeDatabase() }, 30000);
    //new countdown
    //
    clearTimeout(this.countdown);
    this.countdownStart();
  }

  //stop timeout
  //
  stop() {
    this.countdownStop();
    clearTimeout(this.delay);
    this.purging = false;
    console.log('process aborted'); //clears timeout
  }

  //countdown vars
  //
  public timerLength: number = 30000;//time in miliseconds
  public prevTick: number = this.timerLength;//prev time in miliseconds
  public currTick: number = 30;//current tick in seconds
  countdownStart() {
    if (this.purging) {
      this.countdown = setTimeout(() => {
        console.log('countdown')
        const nextTick = this.prevTick - 1000;
        this.prevTick = nextTick;
        this.currTick = this.prevTick / 1000;
        this.countdownStart();
      }, 1000);
    } else {
     this.countdownStop();
    }
  }
  countdownStop() {
    //reset countdown vars
    //
    this.prevTick = this.timerLength;
    this.currTick = 0;
    clearTimeout(this.countdown);
  }

  //purges the entire databse uses both start and stop functions to control the long press event
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
