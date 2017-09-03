import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'roundWhole'
})
export class RoundWholePipe implements PipeTransform {

  transform(value: any, args?: any): any {
    return null;
  }

}
