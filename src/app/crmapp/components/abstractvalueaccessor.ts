import { Component, Input, Output, Provider, forwardRef } from "@angular/core";
import { ControlValueAccessor } from '@angular/forms';
import { CatalogService } from '../services/catalog.service';
import { ConfigurationService } from '../services/configuration.service';
import { TCRMEntity } from '../model/allmodels';


export abstract class AbstractValueAccessor implements ControlValueAccessor {
    _value: any = '';
    catList: TCRMEntity[];

    @Input() placeholder: string;
    @Input() cwidth: number = 100;


  constructor(catName: string, public _curService: CatalogService, public _confs: ConfigurationService) {
    this.catList = <TCRMEntity[]>[];
    this._curService.loadCatalog( catName + '/', this.catList, undefined);
  }


    get value(): any { return this._value; };
    set value(v: any) {
      if (v !== this._value) {
        this._value = v;
        this.onChange(v);
      }
    }

    writeValue(value: any) {
      this._value = value;
      this.onChange(value);
    }

    onChange = (_) => {};
    onTouched = () => {};
    registerOnChange(fn: (_: any) => void): void { this.onChange = fn; }
    registerOnTouched(fn: () => void): void { this.onTouched = fn; }
}