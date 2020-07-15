import { Component, OnInit } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';
import { AdoptableService } from '../shared/services/adoptable.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  //dogs var which will contain an array of documents from the database
  //
  public dogs: any;
  //title and meta tag vars
  //
  private title: string = "Pitbull Paradise | Non-profit, No Kill Shelter, Florida Dog Rescues";
  private metaDesc: string = "Pitbull Paradise | Offical Website, Adopt, Volunteer, Donate, Resources, Breed Info, Training, Surrender a Pet, Upcoming Events, Dog of the Month";
  private robots: string = "INDEX, NOFOLLOW"
  private author: string = "github.com/jayleem"


  constructor(private adoptableService: AdoptableService, private titleService: Title, private metaService: Meta) { }

  ngOnInit() {
    //set title and update meta tags
    //
    this.titleService.setTitle(this.title);
    this.metaService.updateTag({ name: 'description', content: this.metaDesc });
    this.metaService.updateTag({ name: 'robots', content: this.robots });
    this.metaService.updateTag({ name: 'author', content: this.author });

    //get dogs
    //
    this.adoptableService
      .getFeaturedDogs()
      .then(res => {
        if (res && !res.status) {
          this.dogs = res
        } else {
          if (res.status == 504) {
            //trouble connecting to database
            //
            console.log('Database is undergoing maintenance.')
            this.dogs = undefined;
          }
        }
      })
      .catch(err => {
        console.log('error: ', err.status);
      });
  }
}
