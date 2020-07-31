import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Title, Meta } from '@angular/platform-browser';

@Component({
  selector: 'app-adoptables',
  templateUrl: './adoptables.component.html',
  styleUrls: ['./adoptables.component.scss']
})
export class AdoptablesComponent implements OnInit {
  private title: string = "";
  private metaDesc: string = "";
  private robots: string = "NOINDEX, NOFOLLOW"
  private author: string = "github.com/jayleem"

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
  }
}
