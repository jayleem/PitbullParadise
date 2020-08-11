import { Directive, HostListener } from '@angular/core';
import { Location } from '@angular/common';

@Directive({
  selector: '[backButton]'
})
export class BackButtonDirective {

  constructor(private location: Location) { }

  @HostListener('click', ['$event']) onClick($event) {
    console.log($event);
   this.onBack();
  }

  ngOnInit(): void {
  }

  onBack() {
    this.location.back();
  }

}
