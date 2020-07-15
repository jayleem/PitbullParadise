import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-jumbotron',
  templateUrl: './jumbotron.component.html',
  styleUrls: ['./jumbotron.component.scss']
})
export class JumbotronComponent implements OnInit {
  public adDict = [
    {
      image: 'https://images.unsplash.com/photo-1455103493930-a116f655b6c5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1440&q=60',
      message: 'Give to make a difference.',
      link: '/',
      linkText: 'Donate'
    },
    {
      image: 'https://images.unsplash.com/photo-1576604062019-d1988fafe520?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1440&q=60',
      message: 'Learn how to get involved.',
      link: '/',
      linkText: 'Apply to be a volunteer'
    },
    {
      image: 'https://images.unsplash.com/photo-1550206574-96bbd259b685?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1440&q=60',
      message: 'Adopt your next best friend.',
      link: '/',
      linkText: 'Adopt'
    },
    {
      image: 'https://images.unsplash.com/photo-1550763200-c150c99abfbe?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1440&q=60',
      message: 'Become a foster and save a life!',
      link: '/',
      linkText: 'Apply to be a foster parent'
    },
  ];
  public imageUrl;
  public message;
  public link;
  public linkText;

  constructor() { }

  ngOnInit(): void {
    this.sliderInit();
  }

  sliderInit() {
    this.getKeyValue(0);//Set initial content to be displayed
    this.sliderStart();
  }

  //timer interval for displaying ads
  //
  index = 0;
  sliderStart() {
    let timer = setInterval(() => {
      if (this.index < this.adDict.length - 1) {
        this.index++;
        this.getKeyValue(this.index);
      } else {
        this.index = 0; //reset index
        this.getKeyValue(this.index);
      }
    }, 3000);
  };

  getKeyValue(index) {
    this.index = index;
    //update vars
    //
    let imageUrl = this.adDict[index].image,
      message = this.adDict[index].message,
      link = this.adDict[index].link,
      linkText = this.adDict[index].linkText
    //set vars
    //
    this.setData(imageUrl, message, link, linkText);
  }

  setData(imageUrl, message, link, linkText) {
    this.imageUrl = imageUrl;
    this.message = message;
    this.link = link;
    this.linkText = linkText;
  }
}
