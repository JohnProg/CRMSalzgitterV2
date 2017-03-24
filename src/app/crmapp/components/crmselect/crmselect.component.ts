import { Component, OnInit, forwardRef, Input, Output,  } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
import { CatalogService } from '../../services/catalog.service';
import { ConfigurationService } from '../../services/configuration.service';
import { TCRMEntity } from '../../model/allmodels';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';


const noop = () => {
};

export const CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR: any = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => CrmSelectComponent),
    multi: true
};


@Component({
  selector: 'cbx-select',
  templateUrl: './crmselect.component.html',
  styleUrls: ['./crmselect.component.scss'],
  providers: [CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR, CatalogService, ConfigurationService]
})
export class CrmSelectComponent implements OnInit, ControlValueAccessor {


    //The internal data model
    private innerValue: any = '';

  @Input() placeholder: string;
  @Input() required: boolean;
  @Input() listApi: string;
  @Input() cName: string;

  itemList: TCRMEntity[];
  constructor(public _catService: CatalogService,public _confs: ConfigurationService) {
  }

  ngOnInit() {
    this.itemList = <TCRMEntity[]>[ ];
    this._catService.loadCatalog( this.listApi + '/', this.itemList, undefined);
  }

    //Placeholders for the callbacks which are later provided
    //by the Control Value Accessor
    private onTouchedCallback: () => void = noop;
    private onChangeCallback: (_: any) => void = noop;

    //get accessor
    get value(): any {
        return this.innerValue;
    };

    //set accessor including call the onchange callback
    set value(v: any) {
        if (v !== this.innerValue) {
            this.innerValue = v;
            this.onChangeCallback(v);
        }
    }

    //Set touched on blur
    onBlur() {
        this.onTouchedCallback();
    }

    //From ControlValueAccessor interface
    writeValue(value: any) {
        if (value !== this.innerValue) {
            this.innerValue = value;
        }
    }

    //From ControlValueAccessor interface
    registerOnChange(fn: any) {
        this.onChangeCallback = fn;
    }

    //From ControlValueAccessor interface
    registerOnTouched(fn: any) {
        this.onTouchedCallback = fn;
    }


}
