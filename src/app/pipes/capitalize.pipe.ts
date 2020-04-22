import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'capitalize'
})
export class CapitalizePipe implements PipeTransform {

  transform(value: any, args?: any): any {
    let names:string[]=value.split(' ').map((item:string)=>(item)?item[0].toUpperCase() +item.substring(1):'');
    return names.join(' ');
  }

}
