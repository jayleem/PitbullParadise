import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  public isCollapsed = false;
  public subMenu0 = false;
  public subMenu1 = false;
  public subMenu2 = false;
  public subMenu3 = false;

  constructor() { }

  ngOnInit(): void {
  }

}
