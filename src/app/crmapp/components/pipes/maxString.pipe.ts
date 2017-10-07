import { Pipe, PipeTransform } from '@angular/core';


@Pipe({
    name: 'maxString',
    pure: false
})
export class MaxStringPipe implements PipeTransform {


    transform(tvalue: string, args: number): any {
        
        
        if( tvalue === undefined || tvalue === '') {
            return '';
        }
        args = args || 20;
        if( tvalue.length > args) {
           return tvalue.substring(0, args - 1) + '...';
        }
          return tvalue;
    }

}