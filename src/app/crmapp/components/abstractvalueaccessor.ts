import { Component, Input, Output, Provider, forwardRef, OnInit, OnDestroy, EventEmitter } from "@angular/core";
import { ControlValueAccessor } from '@angular/forms';
import { CatalogService } from '../services/catalog.service';
import { ConfigurationService } from '../services/configuration.service';
import { TCRMEntity } from '../model/allmodels';


export abstract class AbstractValueAccessor implements ControlValueAccessor, OnInit, OnDestroy {
    _value: any = '';
    catList: TCRMEntity[];

    
    parentId: number = 0;
    @Input() placeholder: string;
    @Input() cwidth: number = 100;
    @Input() catalog: string = '';


    parentCataSubscribe: any;
    @Input() parentCatalog : string = '';
    @Input() parentSelect: AbstractValueAccessor;

    @Output('change') valueChange: EventEmitter<any> = new EventEmitter<any>();


  constructor( public _curService: CatalogService, public _confs: ConfigurationService) {
    this.catList = <TCRMEntity[]>[];

  }

  ngOnInit() {
    if( this.parentSelect === undefined) {
       this._curService.loadCatalog( this.catalog + '/', this.catList, undefined);
    } else {
      this.parentSelect.valueChange.subscribe((data) => {
        this.loadCustomData(data);
      });
    }
  }

  ngOnDestroy() {
     if( this.parentSelect !== undefined ) {
       this.parentSelect.valueChange.unsubscribe();
     }
     if( this.parentCataSubscribe !== undefined) {
       this.parentCataSubscribe.unsubscribe();
     }
  }

    get value(): any { return this._value; };
    set value(v: any) {
      if (v !== this._value) {
        this._value = v;
        this.onChange(v);
        this.valueChange.emit(v);
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

    public loadCustomData(pid : number) {
      if( this.parentCatalog !== undefined && this.parentCatalog !== '') {
       this.parentCataSubscribe = this._curService.loadCustomCatalogObs( this.parentCatalog + pid.toString() , undefined)
        .subscribe((data) => {
            Object.assign(this.catList, data);
          });
      }
    }
}