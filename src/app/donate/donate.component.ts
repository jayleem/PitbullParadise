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
  monthDonationsTotal: number = 0; //gets the donations total, which would be retrieved from the API as an aggregated group query.
  donationGoal: number = 3000; //gets the dontation goal, this would also be retrieved from the API.
  //progress bar var changes the width using ngStyle
  //
  percentCompleted: number = 0;
  //array which will contain the donors for now its just fake data.
  //
  thisMonthDonors = [];

  //Array for the top 10 donors
  //
  donors = [
    {
      donationId: 'HTYjAoCLxHoR9sTE',
      name: "Salvador C.Pollack",
      amount: 10.00,
      date: 1448856013386,
      anonmyous: false
    },
    {
      donationId: 'kRhVNKa3yQ3ITh5r',
      name: "Kyle T.Cordoua",
      amount: 15.00,
      date: 1526556318371,
      anonmyous: false
    },
    {
      donationId: null,
      name: "Sherman Strawberry",
      amount: 25.00,
      date: 1579678237113,
      anonmyous: false
    },
    {
      donationId: 'ID6Rt5i7hikCxrIC',
      name: "Basil J.Greber",
      amount: 50.00,
      date: 1428536168544,
      anonmyous: false
    },
    {
      donationId: 'I1aNQEMtaCUOJHIN',
      name: "Stephan Stangarone",
      amount: 10.00,
      date: 1535601832791,
      anonmyous: false
    },
    {
      donationId: 'wSh3l7U3Sk5dtrVT',
      name: "Rhett Wilfahrt",
      amount: 5.00,
      date: 1430101680476,
      anonmyous: false
    },
    {
      donationId: 'hkicGyUJ5jGOhGpe',
      name: "A.P.Haverty",
      amount: 10.00,
      date: 1443264792358,
      anonmyous: false
    },
    {
      donationId: '0NII05zfcs4yKr79',
      name: "Clyde E.Norlund",
      amount: 30.00,
      date: 1495315687706,
      anonmyous: false
    },
    {
      donationId: 'MryzagNTBH5zUo7w',
      name: "Garry Echeverria",
      amount: 40.00,
      date: 1495742293643,
      anonmyous: false
    },
    {
      donationId: 'xKamHmSkFsH6y21b',
      name: "A.W.Lamber",
      amount: 45.00,
      date: 1492232211635,
      anonmyous: false
    },
    {
      donationId: 'iMxGbBBThxrMCCyM',
      name: "Wilton Starcevic",
      amount: 50.00,
      date: 1426864263499,
      anonmyous: false
    },
    {
      donationId: 'aSu9q59QrCfkBdgs',
      name: "Hyman Benedict McEirath",
      amount: 100.00,
      date: 1458778030921,
      anonmyous: false
    },
    {
      donationId: '4htZjCCYJtwZRhIr',
      name: "Rosario Arron Nalley",
      amount: 100.00,
      date: 1532169726213,
      anonmyous: false
    },
    {
      donationId: 'NrldC5W8cJwZ9DbF',
      name: "Scot O.Grzywacz",
      amount: 100.00,
      date: 1525718414292,
      anonmyous: false
    },
    {
      donationId: 'gEG91NpHf2HmFiBB',
      name: "Gilberto Villaplana",
      amount: 100.00,
      date: 1477306858071,
      anonmyous: false
    },
    {
      donationId: 'xtqYtbR7Bfyni06k',
      name: "Gavin Eschete",
      amount: 100.00,
      date: 1427582624883,
      anonmyous: false
    },
    {
      donationId: 'VVJgkfww0KIQI33e',
      name: "Cornelius Trifero",
      amount: 10.00,
      date: 1463023272005,
      anonmyous: false
    },
    {
      donationId: 'GnoESk5N7rXN77w1',
      name: "Wayne Sauger",
      amount: 25.00,
      date: 1558499639980,
      anonmyous: false
    },
    {
      donationId: 'prknMrtkVGY2uAOT',
      name: "Santo Palinski",
      amount: 20.00,
      date: 1486646193205,
      anonmyous: false
    },
    {
      donationId: 'oyi5UN5l9ZDHyf65',
      name: "Carlo Marron",
      amount: 10.00,
      date: 1432707576696,
      anonmyous: false
    },
    {
      donationId: 'hgpJW9h0hyIP4FpW',
      name: "King Milloy",
      amount: 5.00,
      date: 1560614055048,
      anonmyous: false
    },
    {
      donationId: '7tyO8IketAwDC9Bp',
      name: "Lyman Jimerez",
      amount: 5.00,
      date: 1437601609401,
      anonmyous: false
    },
    {
      donationId: 'Mlksxn1i5vZT00kR',
      name: "Shon Mel Steuart",
      amount: 5.00,
      date: 1586837663795,
      anonmyous: false
    },
    {
      donationId: 'LGUo8wZufKG6oqCV',
      name: "Wally Dick Zelkind",
      amount: 5.00,
      date: 1533143163437,
      anonmyous: false
    },
    {
      donationId: 'DlYhn39anwB9QkBW',
      name: "Asa T.Stahler",
      amount: 5.00,
      date: 1533645119254,
      anonmyous: false
    },
    {
      donationId: 'TcRrrjJiTfLkn6Dh',
      name: "Young Linn Fryman",
      amount: 5.00,
      date: 1461171865331,
      anonmyous: false
    },
    {
      donationId: 'PBCXmqBHSmlNBjnA',
      name: "Leonore Clingingsmith",
      amount: 5.00,
      date: 1490332289102,
      anonmyous: false
    },
    {
      donationId: 'tLzdSk5Pkzvmznnt',
      name: "Gricelda Lipsitz",
      amount: 5.00,
      date: 1504258970182,
      anonmyous: false
    },
    {
      donationId: 'XDe0Fknty0TJqreE',
      name: "Concetta Perkins",
      amount: 5.00,
      date: 1515991256607,
      anonmyous: false
    },
    {
      donationId: 'zY8LSfiRPtUriRId',
      name: "Elli M. Bramley",
      amount: 5.00,
      date: 1517687618258,
      anonmyous: false
    },
    {
      donationId: '9IpIG60zmQuquQRi',
      name: "L. D. Martis",
      amount: 5.00,
      date: 1459711207058,
      anonmyous: false
    },
    {
      donationId: 'AtYyMbTje2EA8xGi',
      name: "Rubi J. Demich",
      amount: 5.00,
      date: 1506214036513,
      anonmyous: false
    },
    {
      donationId: 'J9O7QtjuDojMqgGe',
      name: "Micah Westmark",
      amount: 5.00,
      date: 1454965808958,
      anonmyous: false
    },
    {
      donationId: 'UdLjAKewCbDnLMvf',
      name: "Leonor Spafford",
      amount: 10.00,
      date: 1580651057399,
      anonmyous: false
    },
    {
      donationId: 'c8JsxQtSYEP8HlJa',
      name: "E. Jewel Hasstedt",
      amount: 10.00,
      date: 1482961465875,
      anonmyous: false
    },
    {
      donationId: 'u6lPMsbxQeDxytzO',
      name: "Mellisa Reck",
      amount: 10.00,
      date: 1572348189545,
      anonmyous: false
    },
    {
      donationId: 'fKNcLbiCRyqI7kx8',
      name: "Thomasena Linscott",
      amount: 10.00,
      date: 1565381947099,
      anonmyous: false
    },
    {
      donationId: '142SCgfI5JWLdqhx',
      name: "Hyacinth T. Narro",
      amount: 10.00,
      date: 1448239304106,
      anonmyous: false
    },
    {
      donationId: '5MaQEk0kf9zqt6ca',
      name: "Katharine Sherrow",
      amount: 10.00,
      date: 1480710490534,
      anonmyous: false
    },
    {
      donationId: 'BX1kuBqVSd30BypJ',
      name: "Ena Silversmith",
      amount: 10.00,
      date: 1576686013755,
      anonmyous: false
    },
    {
      donationId: 'HotlFb3SqGp7uM20',
      name: "J. Mallie Zuchowski",
      amount: 10.00,
      date: 1463791040620,
      anonmyous: false
    },
    {
      donationId: '7sbHNBg9YyV6AiYG',
      name: "Sydney A. Easterling",
      amount: 20.00,
      date: 1559426872327,
      anonmyous: false
    },
    {
      donationId: 'wCsG3fWyvggUPlia',
      name: "Lissa Cinderella Newham",
      amount: 20.00,
      date: 1476598309407,
      anonmyous: false
    },
    {
      donationId: 'fDsJDzCIABBIzD4Z',
      name: "Beverlee J. Lecroy",
      amount: 20.00,
      date: 1446068444289,
      anonmyous: false
    },
    {
      donationId: 'YcLMYRubTNOoUlHl',
      name: "Twila Ishman",
      amount: 50.00,
      date: 1512361164301,
      anonmyous: false
    },
    {
      donationId: 'V9Zme5iq0A2iYcHW',
      name: "S. Renae McGahan",
      amount: 50.00,
      date: 1505867877174,
      anonmyous: false
    },
    {
      donationId: 'jU1akN2wHZaeAnsI',
      name: "L. Jerry Haulbrook",
      amount: 50.00,
      date: 1498540596549,
      anonmyous: false
    },
    {
      donationId: 'y2tKGm7NwiqzvoNt',
      name: "Dusti N. Saucer",
      amount: 50.00,
      date: 1596254430000,
      anonmyous: false
    },
    {
      donationId: 'jagiXejnYSLXSl2C',
      name: "Shawana S. Suentenfuss",
      amount: 10.00,
      date: 1596254400000,
      anonmyous: false
    },
    {
      donationId: 'N2pHdJGMQX0NcO8r',
      name: "Dixie Vadasy",
      amount: 10.00,
      date: 1598846400000,
      anonmyous: true
    },
  ]


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

    //Set the percentCompleted variable
    //
    this.percentCompleted = parseFloat((this.monthDonationsTotal / this.donationGoal).toFixed(2)) * 100;

    //donorsInit
    //
    this.donorsInit();
  }

  donorsInit() {
    let date = new Date();
    var firstDay = new Date(date.getFullYear(), date.getMonth(), 1).getTime();//get first day of the month
    var lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0).getTime();;//get last day of the month

    //iterate over the donors array finding donations which were made this month
    //
    for (const donor in this.donors) {
      if (this.donors[donor].date >= firstDay && this.donors[donor].date <= lastDay) {
        const currDonor = this.donors[donor];
        !currDonor.anonmyous ? currDonor.name = currDonor.name : currDonor.name = "Anonymous";
        this.thisMonthDonors.push(currDonor);
        this.monthDonationsTotal += currDonor.amount;
      } else {
        console.log('old money :(');
      }
    }
    //update funding progress
    //
    this.percentCompleted = parseFloat((this.monthDonationsTotal / this.donationGoal).toFixed(2)) * 100;
    //sort the thisMonthDonors
    //
    this.thisMonthDonors.sort((a, b) => {
      return a.date === b.date ? 0 : a.date > b.date ? -1 : 1;
    });
    //sort the topDonors
    //
    this.donors.sort((a, b) => {
      return a.amount === b.amount ? 0 : a.amount > b.amount ? -1 : 1;
    });
  }
}
