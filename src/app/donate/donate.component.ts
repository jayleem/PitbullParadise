import { Component, OnInit } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';

@Component({
  selector: 'app-donate',
  templateUrl: './donate.component.html',
  styleUrls: ['./donate.component.scss']
})
export class DonateComponent implements OnInit {
  //title and meta tag vars
  //
  private title: string = "Pitbull Paradise | Non-profit, No Kill Shelter, Florida Dog Rescues";
  private metaDesc: string = "Pitbull Paradise | Offical Website - Click now to make a donation!";
  private robots: string = "INDEX, NOFOLLOW"
  private author: string = "github.com/jayleem"
  /*
  Notes:
  Currently this component is just using fake data which would be fetched from the API at a later date.
  Most of this is unnecessary as in real world apps the client could easily just use gofundme and I could just embed
  their gofundme campaign into this component.

  While this is great practice, I most likely won't create the schemas or models to retrieve data from the API due
  to the reasons above.
  */

  //vars to be used with the various elements of the component template
  //
  d: Date = new Date(); //gets the current date
  month: string = this.d.toLocaleString('default', { month: 'long' }); //gets the current month.
  monthDonationsTotal: number = 448; //gets the donations total, which would be retrieved from the API as an aggregated group query.
  donationGoal: number = 3000; //gets the dontation goal, this would also be retrieved from the API.
  //progress bar var changes the width using ngStyle
  //
  percentCompleted: number = 0;
  //array which will contain the donors for now its just fake data.
  //
  thisMonthDonors = [
    {
      name: "Terisa Kinsel",
      amount: 10.00
    },
    {
      name: "Aide Pahl",
      amount: 10.00
    },
    {
      name: "Odelia Maio",
      amount: 5.00
    },
    {
      name: "Kandis Augustus",
      amount: 5.00
    },
    {
      name: "Clint Fancher",
      amount: 10.00
    },
    {
      name: "Esta Schubert",
      amount: 15.00
    },
    {
      name: "Melodi Platt",
      amount: 25.00
    },
    {
      name: "Molly Andrea",
      amount: 40.00
    },
    {
      name: "Willene Weathers",
      amount: 20.00
    },
    {
      name: "Quincy Lush",
      amount: 30.00
    },
    {
      name: "Yukiko Alvidrez",
      amount: 20.00
    },
    {
      name: "Lonny Monteith",
      amount: 20.00
    },
    {
      name: "Jewell Hansell",
      amount: 20.00
    },
    {
      name: "Marian Wilmot",
      amount: 20.00
    },
    {
      name: "Jonathon Soler",
      amount: 20.00
    },
    {
      name: "Mei Saldana",
      amount: 20.00
    },
    {
      name: "Mildred Squillace",
      amount: 20.00
    },
    {
      name: "Altagracia Aubert",
      amount: 20.00
    },
    {
      name: "Veta Ha",
      amount: 20.00
    },
    {
      name: "Maryanne Lauritzen",
      amount: 20.00
    },
    {
      name: "Jarrod Soucie",
      amount: 20.00
    },
    {
      name: "Kyoko Soto",
      amount: 20.00
    },
    {
      name: "Lucius Gurley",
      amount: 20.00
    },
    {
      name: "Reynaldo Mazzotta",
      amount: 20.00
    },
    {
      name: "Lael Macdowell",
      amount: 20.00
    },
    {
      name: "Katrina Shedrick",
      amount: 520.00
    },
    {
      name: "Toshia Runion",
      amount: 5.00
    },
    {
      name: "Markus Mackenzie",
      amount: 5.00
    },
    {
      name: "Winfred Bosserman",
      amount: 5.00
    },
    {
      name: "Antoine Snead",
      amount: 5.00
    },
    {
      name: "Iraida Healy",
      amount: 5.00
    },
    {
      name: "Ronnie Brophy",
      amount: 5.00
    },
    {
      name: "Rosamond Madonna",
      amount: 5.00
    },
    {
      name: "Sonja Bibler",
      amount: 5.00
    },
    {
      name: "Roxanna Locklear",
      amount: 10.00
    },
    {
      name: "Lenny Villafuerte",
      amount: 46.00
    },
    {
      name: "Evelyn Cessna",
      amount: 123.00
    },
    {
      name: "Hannah Dietrich",
      amount: 118.00
    },
    {
      name: "Frieda Faust",
      amount: 6581.00
    },
    {
      name: "Shala Boyles",
      amount: 2578.00
    },
    {
      name: "Kimberley Sweetser",
      amount: 3687.00
    },
    {
      name: "Marlena Berkowitz",
      amount: 368.00
    },
    {
      name: "Kera Clingerman",
      amount: 1374.00
    },
    {
      name: "Ariana Maisch",
      amount: 200.00
    },
    {
      name: "Coleman Putman",
      amount: 100.00
    },
    {
      name: "Verena Mager",
      amount: 25.00
    },
    {
      name: "Essie Gruber",
      amount: 20.00
    },
    {
      name: "Forrest Shay",
      amount: 5.00
    },
    {
      name: "Ernesto Eber",
      amount: 10.00
    },
    {
      name: "Kizzie Hausner",
      amount: 50.00
    }
  ]
  //Array for the top 10 donors
  //
  topDonors: any[];

  constructor(
    private titleService: Title, 
    private metaService: Meta,
  ) { }

  ngOnInit(): void {
    //set title and update meta tags
    //
    this.titleService.setTitle(this.title);
    this.metaService.updateTag({ name: 'description', content: this.metaDesc });
    this.metaService.updateTag({ name: 'robots', content: this.robots });
    this.metaService.updateTag({ name: 'author', content: this.author });
    //Get the top 10 donors for now I just shallow copy the thisMonthDonors array.
    //
    this.topDonors = [...this.thisMonthDonors];
    //Sort the topDonors array if I was using the API this step wouldn't be neccessary.
    //
    this.topDonors.sort((a, b) => {
      return a.amount === b.amount ? 0 : a.amount > b.amount ? -1 : 1;
    });
    //Set the percentCompleted variable
    //
    this.percentCompleted = parseFloat((this.monthDonationsTotal / this.donationGoal).toFixed(2)) * 100;
  }

}
