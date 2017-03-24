import { Component, OnInit, Input, Output, EventEmitter, forwardRef   } from '@angular/core';
import { CatalogService } from '../../services/catalog.service';
import { ConfigurationService } from '../../services/configuration.service';
import { TCRMEntity } from '../../model/allmodels';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';

const noop = () => {
};

export const CBX_COUNTRY_CONTROL_VALUE_ACCESSOR: any = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => CbxcountryComponent),
    multi: true
};


@Component({
  selector: 'cbx-country',
  templateUrl: './cbxcountry.component.html',
  styleUrls: ['./cbxcountry.component.scss'],
  providers: [CatalogService, ConfigurationService ]
})
export class CbxcountryComponent implements OnInit, ControlValueAccessor {


 private innerValue: any = '';

//Placeholders for the callbacks which are later providesd
    //by the Control Value Accessor
 private onTouchedCallback: () => void = noop;
 private onChangeCallback: (_: any) => void = noop;


 @Input() cplaceholder: string;
 countryList: Array<TCRMEntity>;
 @Output() onSelected = new EventEmitter<number>();

  constructor(public _curService: CatalogService,public _confs: ConfigurationService) {
  }

  ngOnInit() {
    this.countryList = <TCRMEntity[]>  [
    ];

    this._curService.loadCatalog('Country/', this.countryList, undefined);
  }

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

    onCountrySelected(event: any) {
      if( this.onSelected !== undefined) {

        this.onSelected.emit(event);
      }
    }
}
