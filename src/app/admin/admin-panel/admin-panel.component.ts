import { Component, OnInit } from '@angular/core';
import { AdoptableService } from 'src/app/shared/services/adoptable.service';
import { AuthService } from 'src/app/shared/services/auth.service';
import { DbMessageService } from 'src/app/shared/services/db-message.service';
import { Title, Meta } from '@angular/platform-browser';

@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.scss']
})
export class AdminPanelComponent implements OnInit {
  public delay: any;
  public purging: boolean = false;
  public dbStatus: boolean = false;
  public featuredDog: any;
  //TO-DO
  //get server addr and api key from enviorment variables
  public serverAddr: string = "http://localhost:3000/"
  public apiKey: string = "abcdef12345"
  public report = null;

  private title: string = "Pitbull Paradise | Admin Panel";
  private metaDesc: string = "";
  private robots: string = "NOINDEX, NOFOLLOW"
  private author: string = "github.com/jayleem"

  constructor(
    private adoptablesService: AdoptableService,
    private titleService: Title,
    private metaService: Meta,
    private authService: AuthService,
    private dbMessageService: DbMessageService
  ) { }

  ngOnInit(): void {
    this.dbTestConnection()

    //set title and update meta tags
    //
    this.titleService.setTitle(this.title);
    this.metaService.updateTag({ name: 'description', content: this.metaDesc });
    this.metaService.updateTag({ name: 'robots', content: this.robots });
    this.metaService.updateTag({ name: 'author', content: this.author });
  }

  dbTestConnection() {
    this.dbStatus = false;//reset dbstatus var
    setTimeout(() => {
      this.adoptablesService.getFeaturedDogs()
        .then(res => {
          if (res) {
            //server responded
            //
            this.featuredDog = res;
            this.dbStatus = true;
          } else {
            //server didn't respond
            this.featuredDog = null;
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
    this.delay = setTimeout(() => { this.purgeDatabase() }, 1000);
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
