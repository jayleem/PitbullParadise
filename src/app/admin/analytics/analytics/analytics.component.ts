import { Component, OnInit } from '@angular/core';
import { AdoptableService } from 'src/app/shared/services/adoptable.service';
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import * as pluginLabels from 'chartjs-plugin-labels';
import { Label, Color } from 'ng2-charts';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-analytics',
  templateUrl: './analytics.component.html',
  styleUrls: ['./analytics.component.scss']
})
export class AnalyticsComponent implements OnInit {
  //toggle analytic components
  //
  togglePanel0: boolean = true;
  togglePanel1: boolean = true;
  togglePanel2: boolean = true;
  togglePanel3: boolean = true;
  togglePanel4: boolean = true;

  //long press event
  //
  delay: any;
  purging: boolean = false;
  dbStatus: boolean = false;
  //TO-DO
  //get server addr and api key from enviorment variables
  serverAddr: string = "http://localhost:3000/"
  apiKey: string = "abcdef12345"
  report = null;
  //error msg
  errorMsg: string = "";

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
        //got response
        if (res.data) {
          if (res.data.adoptables.total > 0) {
            //response from API/Server and report is valid
            //
            this.report = res.data;
            this.updateCharts();
          } else {
            //response from API/Server but report is invalid (most likely no documents inserted yet)
            //
            this.report = null;
            this.errorMsg = "Unable to generate report when no valid documents exist..."
          }
        } else {
          //no response from API/Server
          //
          this.report = null;
          this.errorMsg = "Sorry, there was an error connecting to the API..."
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
  public pieChartPlugins = {
    plugins: {
      labels: {
        // render 'label', 'value', 'percentage', 'image' or custom function, default is 'percentage'
        render: "percentage",

        // precision for percentage, default is 0
        precision: 0,

        // identifies whether or not labels of value 0 are displayed, default is false
        showZero: true,

        // font size, default is defaultFontSize
        fontSize: 12,

        // font color, can be color array for each data or function for dynamic color, default is defaultFontColor
        fontColor: "#000000",

        // font style, default is defaultFontStyle
        fontStyle: "normal",

        // font family, default is defaultFontFamily
        fontFamily:
          "'Helvetica Neue', 'Helvetica', 'Arial', sans-serif",

        // draw text shadows under labels, default is false
        // textShadow: true,

        // text shadow intensity, default is 6
        shadowBlur: 10,

        // text shadow X offset, default is 3
        shadowOffsetX: -5,

        // text shadow Y offset, default is 3
        shadowOffsetY: 5,

        // text shadow color, default is 'rgba(0,0,0,0.3)'
        // shadowColor: "rgba(255,0,0,0.75)",

        // draw label in arc, default is false
        // bar chart ignores this
        arc: true,

        // position to draw label, available value is 'default', 'border' and 'outside'
        // bar chart ignores this
        // default is 'default'
        position: "outside",

        // draw label even it's overlap, default is true
        // bar chart ignores this
        overlap: true,

        // show the real calculated percentages from the values and don't apply the additional logic to fit the percentages to 100 in total, default is false
        showActualPercentages: true,

        // add padding when position is `outside`
        // default is 2
        outsidePadding: 4,

        // add margin of text when position is `outside` or `border`
        // default is 2
        textMargin: 4
      },
      datalabels: {
        formatter: (value, ctx) => {
          const label = ctx.chart.data.labels[ctx.dataIndex];
          return label;
        },
      }
    }
  }
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
