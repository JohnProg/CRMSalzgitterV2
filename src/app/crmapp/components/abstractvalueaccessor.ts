import { Component, Input, Output, Provider, forwardRef, OnInit, AfterViewInit, OnDestroy, EventEmitter } from "@angular/core";
import { ControlValueAccessor } from '@angular/forms';
import { CatalogService } from '../services/catalog.service';
import { ConfigurationService } from '../services/configuration.service';
import { TCRMEntity } from '../model/allmodels';
import { ReactiveFormsModule, NgForm } from '@angular/forms';


export abstract class AbstractValueAccessor implements ControlValueAccessor, OnInit, AfterViewInit, OnDestroy {
    _value: any = '';
    catList: TCRMEntity[];


    parentId: number = 0;
    @Input() placeholder: string;
    @Input() cwidth: number = 100;
    @Input() catalog: string = '';
    @Input() disabled: boolean = false;
    @Input() fieldDisplay: string = 'Name';
    @Input() byType: string;
    parentCataSubscribe: any;
    @Input() parentCatalog : string = '';
    @Input() parentSelect: AbstractValueAccessor;
    @Input() required: boolean = true;
    @Output('change') valueChange: EventEmitter<any> = new EventEmitter<any>();
    @Input() nForm: NgForm;

  constructor( public _curService: CatalogService, public _confs: ConfigurationService) {
    this.catList = <TCRMEntity[]>[];
  }

  ngOnInit() {

  }
  
  ngAfterViewInit() {
    
    if( this.byType !== undefined) {
       this.loadFromType();
    } else if( this.parentSelect === undefined) {
       this._curService.loadCatalogObs( this.catalog , undefined,  undefined)
       .map((response) => response.json()).subscribe((data) => {
           Object.assign(this.catList, <TCRMEntity[]>data);
      }, (error) => {});
    } else if(this.parentSelect !== undefined) {
      this.parentSelect.valueChange.subscribe((data: TCRMEntity) => {
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
        let c = this.catList.filter( (item: TCRMEntity) => item.id === v)[0];
        this.valueChange.emit(c);
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

    public loadCustomData(pid : TCRMEntity) {
      if( this.parentCatalog !== undefined && this.parentCatalog !== '') {
       this.parentCataSubscribe = this._curService.loadCustomCatalogObs( this.parentCatalog + pid.id.toString() , undefined)
        .map((response) => response.json()).subscribe((data) => {
            this.catList = [];
            Object.assign(this.catList, data);
          });
      }
    }

    public loadCustomDataFromId(pid : number) {
      if( this.parentCatalog !== undefined && this.parentCatalog !== '') {
       this.parentCataSubscribe = this._curService.loadCustomCatalogObs( this.parentCatalog + pid.toString() , undefined)
        .map((response) => response.json()).subscribe((data) => {
            this.catList = [];
            Object.assign(this.catList, data);
          });
      }
    }

    public loadFromType() {
      
       this.parentCataSubscribe = this._curService.loadCustomCatalogObs( this.catalog + this.byType, [] )
        .map((response) => response.json()).subscribe((data) => {
            this.catList = [];
            Object.assign(this.catList, data);
          });
    }


    public getItemSelected(): TCRMEntity {
       return this.catList.filter( (item: TCRMEntity) => item.id === this._value)[0];
    }
}