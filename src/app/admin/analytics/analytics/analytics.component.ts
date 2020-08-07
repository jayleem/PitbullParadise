import { Component, OnInit } from '@angular/core';
import { AdoptableService } from 'src/app/shared/services/adoptable.service';
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import { Label, Color } from 'ng2-charts';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-analytics',
  templateUrl: './analytics.component.html',
  styleUrls: ['./analytics.component.scss']
})
export class AnalyticsComponent implements OnInit {

  delay: any;
  purging: boolean = false;
  dbStatus: boolean = false;
  //TO-DO
  //get server addr and api key from enviorment variables
  serverAddr: string = "http://localhost:3000/"
  apiKey: string = "abcdef12345"
  report = null;

  private title: string = "Pitbull Paradise | Admin Panel";
  private metaDesc: string = "";
  private robots: string = "NOINDEX, NOFOLLOW"
  private author: string = "github.com/jayleem"

  private subscriptions: Subscription[] = [];
  constructor(
    private adoptablesService: AdoptableService,
  ) { }

  ngOnInit(): void {
    //generate intiial report
    this.getReport();
    //real time analytics subscription
    //
    this.subscriptions.push(this.adoptablesService.getChanges().subscribe((value) => {
      if (!value) {
        //no db changes
        //
      } else {
        this.getReport();
      }
    })
    );
  }

  getReport() {
    this.adoptablesService.getAnalytics()
      .then(res => {
        if (res.data) {
          //response data not null
          //
          this.report = res.data;
          this.updateCharts();
        } else {
          //no report, API/DB server must be down.
          //
          this.report = null;
        }
      })
  }

  //initial pie chart configuration
  //
  public pieChartOptions: ChartOptions = {
    tooltips: {
      callbacks: {
        label: function (tooltipItem, data) {
          return data['labels'][tooltipItem['index']] + ': ' + data['datasets'][0]['data'][tooltipItem['index']] + '%';
        }
      }
    },
    title: {
      display: true,
      text: 'Dogs by Age',
      fontColor: '#2b2c3280',
      fontSize: 13,
      fontFamily: 'Raleway'
    },
    responsive: true,
    legend: {
      position: 'left',
      labels: {
        fontSize: 13,
        fontStyle: 'normal',
        fontFamily: 'Raleway'
      },
    },
  };
  public pieChartOptions2: ChartOptions = {
    tooltips: {
      callbacks: {
        label: function (tooltipItem, data) {
          return data['labels'][tooltipItem['index']] + ': ' + data['datasets'][0]['data'][tooltipItem['index']] + '%';
        }
      }
    },
    title: {
      display: true,
      text: 'Dogs by Breed',
      fontColor: '#2b2c3280',
      fontSize: 13,
      fontFamily: 'Raleway'
    },
    responsive: true,
    legend: {
      position: 'left',
      labels: {
        fontSize: 13,
        fontStyle: 'normal',
        fontFamily: 'Raleway'
      },
    },
  };
  public pieChartLabels: Label[] = [];
  public pieChartData: number[] = [];
  public pieChartLabels2: Label[] = [];
  public pieChartData2: number[] = [];
  public pieChartType: ChartType = 'pie';
  public pieChartLegend = true;
  public pieChartPlugins = false;
  public pieChartColors = [
    {
      backgroundColor: []
    },
  ];
  //initial line chart configuration
  //
  public lineChartData: ChartDataSets[] = [
    {
      data: [],
      label: ''
    }
  ];
  public lineChartLabels: Label[] = [];
  public lineChartOptions: (ChartOptions) = {
    title: {
      display: true,
      text: 'MONTHLY INTAKES',
      fontColor: '#2b2c3280',
      fontSize: 13,
      fontFamily: 'Raleway'
    },
    responsive: true,
    scales: {
      // We use this empty structure as a placeholder for dynamic theming.
      xAxes: [
        {
          ticks: {
            fontColor: '#2b2c3280',
          },
          gridLines: {
            display: true
          }
        }
      ],
      yAxes: [
        {
          id: 'y-axis-0',
          position: 'left',
          ticks: {
            fontColor: '#2b2c32',
            stepSize: 1.0,
            min: 0,
            max: 25
          },
          gridLines: {
            display: true
          }
        }
      ]
    },
  };

  //bar chart vars
  //
  public barChartOptions: (ChartOptions) = {
    title: {
      display: true,
      text: 'Dogs by Breed and Gender',
      fontColor: '#2b2c3280',
      fontSize: 13,
      fontFamily: 'Raleway'
    },
    responsive: true
  }
  public barChartColors: Array<any> = [];
  public barChartLabels: Label[] = [];
  public barChartData: ChartDataSets[] = [];
  public barChartLegend = true;
  public barChartType = 'horizontalBar';
  public barChartPlugins = false;

  //line chart vars
  //
  public lineChartColors: Color[] = [];
  public lineChartLegend = true;
  public lineChartType = 'line';
  public lineChartPlugins = false;
  updateCharts() {
    //first pie chart containing data about total dogs and age
    //
    this.pieChartLabels = [
      `Puppies`,
      `Adults`,
      `Seniors`
    ];
    this.pieChartData = [
      (this.report.adoptables.totalPuppies / this.report.adoptables.total) * 100,
      (this.report.adoptables.totalAdults / this.report.adoptables.total) * 100,
      (this.report.adoptables.totalSeniors / this.report.adoptables.total) * 100
    ];
    //second pie chart containing breed data
    //
    this.pieChartLabels2 = []
    this.report.adoptables.breeds.forEach(item => {
      this.pieChartLabels2.push(item.breed);
    });
    this.pieChartData2 = [];
    this.report.adoptables.breeds.forEach(item => {
      this.pieChartData2.push(item.total / (this.report.adoptables.total) * 100);
    });
    //pie chart colors
    //
    this.pieChartColors[0].backgroundColor = [
      '#4b8b7c',
      '#589d83',
      '#69ae89',
      '#7fc08c',
      '#97d18e',
      '#b4e18f',
      '#d3f190',
      '#d9e382',
      '#ded476',
      '#e1c66d',
      '#e3b867',
      '#e3aa64',
      '#e29c62'
    ];

    //bar chart configuration
    //
    this.barChartColors = [
      {
        backgroundColor: '#4b8b7c'
      },
      {
        backgroundColor: '#69ae89'
      }
    ];
    let dataM: any[] = []; //holds male data points
    let dataF: any[] = []; //holes female data points
    //genereate labels and push data to data arrays
    //
    this.report.adoptables.breeds.forEach(item => {
      this.barChartLabels.push(item.breed);
      dataM.push(item.male);
      dataF.push(item.female);
    });
    //define datasets
    let dataSet1 = { label: "Male", data: dataM, stack: '0' };
    let dataSet2 = { label: "Female", data: dataF, stack: '0' };
    //set datasets
    //
    this.barChartData.push(dataSet1, dataSet2);

    //line chart configuration
    //
    this.report.adoptables.intakeDates.forEach(date => {
      let d = new Date(date[0]);
      const month = d.toLocaleString('default', { month: 'long' });
      const year = d.toLocaleString('default', { year: 'numeric' });
      const label = year + '-' + month;
      this.lineChartLabels.push(label);
    });
    this.report.adoptables.intakeDates.forEach(date => {
      this.lineChartData[0].data.push(date[1]);
    });
    this.lineChartData[0].label = 'Intakes';
    this.lineChartData[0].label.fontcolor('black');
    this.lineChartLegend = false;
    this.lineChartColors[0] = {
      // grey
      backgroundColor: '#4b8b7c',
      borderColor: '#9ac8b3',
      pointBackgroundColor: '#fff',
      pointBorderColor: '#e9914a',
      pointHoverBackgroundColor: '#e9914a',
      pointHoverBorderColor: '#fff'
    }
  }

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
}
