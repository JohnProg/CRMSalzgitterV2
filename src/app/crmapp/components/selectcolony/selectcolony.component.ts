import { Component, Input, Output, forwardRef, EventEmitter } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { CatalogService } from '../../services/catalog.service';
import { ConfigurationService } from '../../services/configuration.service';


import { Observable } from 'rxjs';
import { AbstractValueAccessor  } from '../abstractvalueaccessor';

import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
import {   Colony } from '../../model/allmodels';

export const findColonyQl = gql`
  query 
       findColoniesFromZipCode($zipcode: String!) {
            findColoniesFromZipCode(zipcode: $zipcode) { id  name description   } 
        }
  
`;

const CRM_CBX_SELECTCOLONY_CONTROL_VALUE_ACCESSOR = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => SelectcolonyComponent),
  multi: true
};

@Component({
  selector: 'crm-selectcolony',
  templateUrl: './selectcolony.component.html',
  styleUrls: ['./selectcolony.component.scss'],
  providers: [CRM_CBX_SELECTCOLONY_CONTROL_VALUE_ACCESSOR]  
})
export class SelectcolonyComponent extends AbstractValueAccessor {

  @Input() zipCode: string;
  constructor(public _curService: CatalogService, 
              public _confs: ConfigurationService) {
    super(_curService, _confs);
  }

  setZipCode(zcode: string) {
    this.zipCode = zcode;
    this.loadFromType();
  }

  getFromZipCode($event) {
    this.loadFromType();
  }
  
  
  public loadFromType() {
      if( this.zipCode !== undefined) {
      this._curService.loadQl(findColonyQl, { zipcode: this.zipCode })
        .subscribe(({data}) => {
          this.catList = data['findColoniesFromZipCode'];
        }, (error: Error) => {
          debugger
        });
      } else {
         this.catList = [];
      }
    }
  
}
