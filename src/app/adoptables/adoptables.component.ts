import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-adoptables',
  templateUrl: './adoptables.component.html',
  styleUrls: ['./adoptables.component.scss']
})
export class AdoptablesComponent implements OnInit {
 constructor(private router: Router){}
 ngOnInit(){}
}
