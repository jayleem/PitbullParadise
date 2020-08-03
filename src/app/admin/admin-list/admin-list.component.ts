import { Component, OnInit } from '@angular/core';
import { AdoptableService } from 'src/app/shared/services/adoptable.service';
import { Title, Meta } from '@angular/platform-browser';
import { Adoptable } from 'src/app/models/adoptables';
import { DbMessageService } from 'src/app/shared/services/db-message.service';

@Component({
  selector: 'app-admin-list',
  templateUrl: './admin-list.component.html',
  styleUrls: ['./admin-list.component.scss']
})
export class AdminListComponent implements OnInit {

  //selected dog id used for deleteing a ticket from table view
  //
  public id;

  //table filter vars
  public currentAge; //default age
  public currentGender; //default gender
  public currentSearchTerms; //default id
  //pagination vars
  //
  public currentPage = 1;
  public itemsPerPage = 25;
  public pageSize = 0;
  public min;
  public max;

  //dogs var which will contain an array of documents from the database
  //
  public dogs: Adoptable[] = [];

  //title and meta tag vars
  //
  private title: string = "Pitbull Paradise | Non-profit, No Kill Shelter, Florida Dog Rescues";
  private metaDesc: string = "Pitbull Paradise | Offical Website - Click now to view our dogs available for adoption!";
  private robots: string = "NOINDEX, NOFOLLOW"
  private author: string = "github.com/jayleem"

  //mongodb pagination these values are converted to integers server side
  //
  public skip: string = "0";
  public limit: string = "24";
  public maxDocs: number = 0;

  constructor(
    private adoptablesService: AdoptableService, 
    private titleService: Title, 
    private metaService: Meta,
    private dbMessageService: DbMessageService
    ) { }

  ngOnInit() {
    //get dogs
    //
    this.getDogs();
    //set title and update meta tags
    //
    this.titleService.setTitle(this.title);
    this.metaService.updateTag({ name: 'description', content: this.metaDesc });
    this.metaService.updateTag({ name: 'robots', content: this.robots });
    this.metaService.updateTag({ name: 'author', content: this.author });
  }

  getDogs() {
    this.adoptablesService.getDogs("0","0")
    .then(res => {
      this.maxDocs = res.length - parseInt(this.limit);
    })
    this.adoptablesService.getDogs(this.skip, this.limit)
      .then(res => {
        this.dogs = res;
      })
      .catch(err => console.log(err))
  }

  changeAge(change: string) {
    this.currentAge = change;
  }

  changeGender(change: string) {
    this.currentGender = change;
  }

  changeSearchTerms(change: string) {
    this.currentSearchTerms = change;
    this.applyFilters();
  }

  //applyFilters
  applyFilters() {
    this.adoptablesService.getDogsQuery(this.currentAge, this.currentGender, this.currentSearchTerms)
      .then(res => {
        if (res.length > 0) {
          this.dogs = res;
        } else {
          this.dogs = null;
        }
      })
      .catch(err => console.log(err))
  }

  //clear filters
  //
  clearFilters() {
    //reset filter vars
    //
    this.currentAge = null;
    this.currentGender = null;
    this.currentSearchTerms = null;
    //
    //reset pagination and dogs documents array
    this.skip = "0";
    this.limit = "24";
    this.getDogs();
  }

  onPrev() {
    window.scrollTo(0, 0);
    const skip = parseInt(this.skip);
    const limit = parseInt(this.limit);
    const prev = skip - limit < 0 ? 0 : skip - limit;
    this.skip = prev.toString();
    this.getDogs();
  }

  onNext() {
    window.scrollTo(0, 0);
    const skip = parseInt(this.skip);
    const limit = parseInt(this.limit);
    const next = skip + limit;
    this.skip = next.toString();
    this.getDogs();
  }


  //format age method takes a float the first integer is years the second is months
  //age 1 will be displayed as 1 year
  //age 1.2 will be displayed as 1 year, 2 months
  //age 0.2 will be displayed as 2 months
  formatAge(n: number) {
    let age = n.toString().split('.');
    let results: string;
    if (n < 1) {
      results = `${age[1]} months`;
    } else if (n % 1 === 0) {
      results = `${age[0]} years`;
    } else {
      results = `${age[0]} years, ${age[1]} months`;
    }
    return results;
  }
  
  onDelete(value: any) {
    this.adoptablesService
    .deleteDogByID(value)
    .then(res => {
     this.dbMessageService.setMessage(res.message, res.type);
    })
    .catch(err => {
      console.log(err);
    })
  }

  onSetFeatured(value: any) {
    this.adoptablesService
    .setFeaturedDogById(value)
    .then(res => {
     this.dbMessageService.setMessage(res.message, res.type);
    })
    .catch(err => {
      console.log(err);
    })  
  }
}
