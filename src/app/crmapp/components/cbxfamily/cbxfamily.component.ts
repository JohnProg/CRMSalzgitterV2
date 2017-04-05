import { Component, Input, Output, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { CatalogService } from '../../services/catalog.service';
import { ConfigurationService } from '../../services/configuration.service';
import { TCRMEntity } from '../../model/allmodels';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { AbstractValueAccessor  } from '../abstractvalueaccessor';

const CRM_CBX_CONTROL_VALUE_ACCESSOR = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => CbxfamilyComponent),
  multi: true
};


@Component({
  selector: 'crm-cbx-family',
  templateUrl: './cbxfamily.component.html',
  styleUrls: ['./cbxfamily.component.scss'],
  providers: [CRM_CBX_CONTROL_VALUE_ACCESSOR, CatalogService, ConfigurationService]
})
export class CbxfamilyComponent extends AbstractValueAccessor {


  private familyList: TCRMEntity[];

  constructor(public _curService: CatalogService, public _confs: ConfigurationService) {
    super('Family', _curService, _confs);
  }
  
}
