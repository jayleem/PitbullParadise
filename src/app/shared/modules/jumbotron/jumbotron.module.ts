import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { JumbotronComponent } from '../../components/jumbotron/jumbotron.component';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';



@NgModule({
  declarations: [JumbotronComponent],
  imports: [
    NgbModule,
    RouterModule,
    CommonModule
  ],
  exports: [
    JumbotronComponent
  ]
})
export class JumbotronModule { }
