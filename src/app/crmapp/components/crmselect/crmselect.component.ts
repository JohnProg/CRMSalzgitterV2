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
  useExisting: forwardRef(() => CRMSelectComponent),
  multi: true
};


@Component({
  selector: 'crm-select',
  templateUrl: './crmselect.component.html',
  styleUrls: ['./crmselect.component.scss'],
  providers: [CRM_CBX_CONTROL_VALUE_ACCESSOR, CatalogService, ConfigurationService]
})
export class CRMSelectComponent extends AbstractValueAccessor {
  @Input() catalog: string;
  constructor(public _curService: CatalogService, public _confs: ConfigurationService) {
    super(_curService, _confs);
  }
  
}
