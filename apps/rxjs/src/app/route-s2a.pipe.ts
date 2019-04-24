import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'routeS2a'
})
export class RouteS2aPipe implements PipeTransform {
  transform(value: any, ...args: any): any {
    return [...args, ...value.split('/')];
  }
}
