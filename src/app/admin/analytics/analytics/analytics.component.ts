import { Component, OnInit } from '@angular/core';
import { AdoptableService } from 'src/app/shared/services/adoptable.service';
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import { Label, Color } from 'ng2-charts';

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

  constructor(
    private adoptablesService: AdoptableService,
  ) { }

  ngOnInit(): void {
    this.adoptablesService.getAnalytics().then(res => this.report = res).then(() => this.updateCharts());
  } 

  //initial pie chart configuration
  //
  public pieChartOptions: ChartOptions = {
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
            max: 100
          },
          gridLines: {
            display: true
          }
        }
      ]
    },
  };
  public lineChartColors: Color[] = [];
  public lineChartLegend = true;
  public lineChartType = 'line';
  public lineChartPlugins = false;
  updateCharts() {
    //first pie chart containing data about total dogs and age
    //
    this.pieChartLabels = [
      `Total, ${this.report.adoptables.total}`,
      `Puppies, ${this.report.adoptables.totalPuppies}`,
      `Adults, ${this.report.adoptables.totalAdults}`,
      `Seniors, ${this.report.adoptables.totalSeniors}`];
    this.pieChartData = [this.report.adoptables.total, this.report.adoptables.totalPuppies, this.report.adoptables.totalAdults, this.report.adoptables.totalSeniors];
    //second pie chart containing breed data
    //
    this.pieChartLabels2 = [`Total, ${this.report.adoptables.total}`]
    this.report.adoptables.breeds.forEach(breed => {
      this.pieChartLabels2.push(breed[0] + ', ' + breed[1]);
    });
    this.pieChartData2 = [this.report.adoptables.total];
    this.report.adoptables.breeds.forEach(breed => {
      this.pieChartData2.push(breed[1]);
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
}
