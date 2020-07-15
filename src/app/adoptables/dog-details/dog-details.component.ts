import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Adoptable } from 'src/app/models/adoptables';
import { AdoptableService } from 'src/app/shared/services/adoptable.service';
import { Title, Meta } from '@angular/platform-browser';

@Component({
  selector: 'app-dog-details',
  templateUrl: './dog-details.component.html',
  styleUrls: ['./dog-details.component.scss']
})
export class DogDetailsComponent implements OnInit {

  //dogs var which will contain an array of documents from the database
  //
  public dogs: Adoptable;
  public id: string;
  //title and meta tag vars
  //
  private title: string = "Pitbull Paradise | Viewing";
  private metaDesc: string = "";
  private robots: string = "NOINDEX, NOFOLLOW"
  private author: string = "github.com/jayleem"


  constructor(private route: ActivatedRoute, private adoptablesService: AdoptableService, private titleService: Title, private metaService: Meta) {
    //object params contains multiple parameters seperated by dash
    //
    let params = this.route.snapshot.paramMap.get('params').split('-');
    //get the second paramter which is the id of the dog
    //
    this.id = params[1];
  }

  ngOnInit() {
    //get dogs
    //
    this.getDogs();
  }

  getDogs() {
    this.adoptablesService.getDogsById(this.id)
    .then(res => {
      this.dogs = res;
      this.update();
    })
    .catch(err => console.log(err))
  }

  update() {
    //set title and update meta tags
    //
    this.titleService.setTitle(this.title + ' ' + this.dogs.name + ' ' + this.dogs.id);
    this.metaService.updateTag({ name: 'description', content: this.dogs.name + ' ' + this.dogs.description});
    this.metaService.updateTag({ name: 'robots', content: this.robots });
    this.metaService.updateTag({ name: 'author', content: this.author });
  }

    //format age method takes a float the first integer is years the second is months
  //age 1 will be displayed as 1 year
  //age 1.2 will be displayed as 1 year, 2 months
  //age 0.2 will be displayed as 2 months
  formatAge(n) {
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

}
