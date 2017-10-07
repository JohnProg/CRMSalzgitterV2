import { Pipe, PipeTransform } from '@angular/core';


@Pipe({
    name: 'nameDesc',
    pure: false
})
export class NameDescPipe implements PipeTransform {


    transform(items: any[], args: any[]): any {
        if(items != undefined && args.toString() != '') {
            let sfields: string[] = [ 'name', 'description' ];
            let stext: string = '';
            if( typeof args === 'string' || args instanceof String) {
                stext = args.toString();
            } else {
                stext = args['text'];
                sfields = args['fields'];
            }
            if( stext.trim().length > 0 ) {
            let sitems = items.filter(item =>  {
                let hasitem: boolean = false;
                sfields.forEach( ( sf: string) => {
                    if( item[sf] != undefined ) {
                        let n = item[sf].toUpperCase().indexOf(stext.toUpperCase()) >= 0;
                        if( n === true) {
                            hasitem = true;
                            return true;
                        }
                    }                     
                });
                return hasitem;
            });
            return sitems;
           }
       }
       return items;
    }

}