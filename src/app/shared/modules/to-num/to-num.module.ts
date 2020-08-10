import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToNumPipe } from '../../pipes/to-num.pipe';



@NgModule({
  declarations: [
    ToNumPipe
  ],
  imports: [
    CommonModule
  ],
  exports: [
    ToNumPipe
  ],
})
export class ToNumModule { }
