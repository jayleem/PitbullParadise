import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'toNum'
})
export class ToNumPipe implements PipeTransform {

  transform(value: string): number {
    return parseInt(value);
  }

}
