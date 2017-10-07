import { Component, OnInit, AfterViewInit, EventEmitter, Output, ViewChild, ContentChild, NgZone, Input } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActionsService } from '../../../services/actions.services';
import { Response, Http, Headers, URLSearchParams, QueryEncoder } from '@angular/http';
import { CatalogService, IPChangeEventSorted } from '../../../services/catalog.service';
import { ConfigurationService } from '../../../services/configuration.service';

import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';
import { BaseComponent,  } from '../../../catalogs/base.component';
import {
  IPageChangeEvent, TdDataTableService, TdDataTableSortingOrder,
  ITdDataTableSortChangeEvent, ITdDataTableColumn,
  TdLoadingService, TdDialogService, TdMediaService
} from '@covalent/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import { MdSnackBar } from '@angular/material';
import { Router, ActivatedRoute } from '@angular/router';


import {TranslateService} from '@ngx-translate/core';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
import {  getCountriesFromIdMill_Result, MillCountry, Country } from '../../../model/index';

const countriestQl = gql`
query {
  countries { id name description }
}
`;


@Component({
  selector: 'crm-millcountry',
  templateUrl: './millcountry.component.html',
  styleUrls: ['./millcountry.component.scss']
})
export class MillcountryComponent extends BaseComponent {
  
    @Input() idMill: number;
    itemEdit: MillCountry;
    countrySelected: number[];
    loadName: string = 'millcountry.load';
  
    
  loadData() {
    
      if ( this.isLoading === false ) {

        if ( this.dataLoaded === true ) {
          this.reloadPaged();
        } else {
          let pparams = new URLSearchParams();
          pparams.set('idmill', this.idMill.toString());
          this._curService.loadCustomAll('MillCountry/searchByMill', pparams);
          this.dataLoaded = true;
        }
      }
  }


    ngBeforeInit() {
      super.ngBeforeInit();
      this.subEditor = true;
       this.catalogName = 'Countries';
      this._curService.setAPI('MillCountry/', this.catalogName, this.loadName); 
    }
  
    ngOnInitClass() {
      super.ngOnInitClass();
      this.entList = <Observable<getCountriesFromIdMill_Result[]>>this._curService.entList;
  
    }
  
    initEntity() {
      this.itemEdit = new  MillCountry();
      this.itemEdit.idMill = this.idMill;
    }
  
    addColumns() {
      this.columns.push({ name: 'name', label: 'Name' });
      this.columns.push({ name: 'description', label: 'Description', tooltip: '' });
    }
  
    loadCatalogs() {
  
          this._curService.loadQl(countriestQl, undefined)
          .subscribe(({data}) => {
            
            let t: Country[] = data['countries'];
            if( t !== undefined) {
               this.catCountry = new Array<Country>();
               t.forEach( e => {
                     this.catCountry.push(e);
               });
              this.removeFromCatalog(undefined);          
            }
          }, (error: Error) => {
            this._loadingService.resolve('');
            
            this._snackBarService.open(' Could not load ' + this.catalogName, 'Ok');
          }
          );   
    }
  
    submitForm(form) {
      
      let t = this.countrySelected;
      if ( form.valid &&  this.beforeSave() === true) {
        if( this.countrySelected.length > 0 ) {
          let items = new Array<MillCountry>();
          this.countrySelected.forEach(element => {
            let p = new MillCountry();
            p.idMill = this.idMill;
            p.idCountry = element;
            items.push(p);
          });
          this._curService.createArray(items);
        }
      } else {
        this._snackBarService.open('There are some errors, please review data ', 'Ok');
      }
    }
  
    afterLoadAll(itms: getCountriesFromIdMill_Result[]) {
      this.isLoading = false;
      this.removeFromCatalog(itms);
    }
  
    ents: getCountriesFromIdMill_Result[];
    notSelectedCountries: Country[];


    removeFromCatalog(items: getCountriesFromIdMill_Result[] ) {
  
      this.ents = items || this.ents;
      if( this.catCountry !== undefined && this.ents !== undefined ) {
      this.notSelectedCountries = new Array<Country>();
      this.catCountry.forEach( element => {
          let idx = this.ents.findIndex( elem => { return elem.idCountry === element.id });
          if( idx < 0) {
              let tdx = <Country>this.catCountry.find( elem => { return elem.id === element.id })
              this.notSelectedCountries.push( tdx);
          } 
      });
  
      }
       this.countrySelected = [];
    }
  
    afterDelete(item: any) {
      super.afterDelete(item);
      this.removeFromCatalog(undefined);
    }


    
    afterCreate(item: any) {
        Object.assign(this.itemEdit, item.item);
        this.isEditing = false;
        this.onItemCreated.emit(item);   
    }
  
  }
  