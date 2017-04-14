import { Component, Input, Output, forwardRef, EventEmitter } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { CatalogService } from '../../services/catalog.service';
import { ConfigurationService } from '../../services/configuration.service';

import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { AbstractValueAccessor  } from '../abstractvalueaccessor';

const CRM_CBX_SELECT_CHILD_CONTROL_VALUE_ACCESSOR = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => CrmselectchildComponent),
  multi: true
};

@Component({
  selector: 'app-crmselectchild',
  templateUrl: './crmselectchild.component.html',
  styleUrls: ['./crmselectchild.component.scss'],
  providers: [CRM_CBX_SELECT_CHILD_CONTROL_VALUE_ACCESSOR, CatalogService, ConfigurationService]

})
export class CrmselectchildComponent extends AbstractValueAccessor  {


  constructor(public _curService: CatalogService, public _confs: ConfigurationService) {
    super(_curService, _confs);
  }

  ngOnInit() {
    
  }

}
