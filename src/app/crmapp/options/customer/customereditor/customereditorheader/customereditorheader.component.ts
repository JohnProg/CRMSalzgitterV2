import { Component, OnInit, AfterViewInit, EventEmitter, Output, ViewChild, ContentChild, NgZone, Input } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActionsService } from '../../../../services/actions.services';
import { Response, Http, Headers, URLSearchParams, QueryEncoder } from '@angular/http';
import { CatalogService, IPChangeEventSorted } from '../../../../services/catalog.service';
import { ConfigurationService } from '../../../../services/configuration.service';


import { Observable ,  Observer ,  BehaviorSubject } from 'rxjs';
import { BaseComponent,  } from '../../../../catalogs/base.component';
import {  IPageChangeEvent } from '@covalent/core';
import { TdDataTableService, TdDataTableSortingOrder, ITdDataTableSortChangeEvent, ITdDataTableColumn } from '@covalent/core/data-table';


import { TdLoadingService } from '@covalent/core/loading';
import { TdMediaService } from '@covalent/core/media';


import { Router, ActivatedRoute } from '@angular/router';



import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
import {  Customer, Colony } from '../../../../model/allmodels';
import { SelectcolonyComponent } from '../../../../components/index';
export const custQl = gql`
  query {
    responsibles { id name isActive  }
    currencies { id name }
  }
`;


@Component({
  selector: 'crm-customereditorheader',
  templateUrl: './customereditorheader.component.html',
  styleUrls: ['./customereditorheader.component.scss']
})
export class CustomereditorheaderComponent extends BaseComponent {

   @Input() idCustomer: number;
   @ViewChild('ccolony') _colony: SelectcolonyComponent;
   itemEdit: Customer;
   colony: Colony;


  ngBeforeInit() {
    super.ngBeforeInit();
    this.catalogName = 'Customer';
    this._curService.setAPI('Customer/', this.catalogName, this.loadName);
    this.singleEditor = true;
    this.autoLoad = false;
  }




  afterViewInit(): void {


      if (this.idCustomer > 0) {
        this.editEntity(this.idCustomer);
      } else {
        
        this.addEntity();
      }


    // this._actions.showAdd(false);
    // this._actions.showSearch(false);
    // this._actions.showSave(true);
    // this._actions.showCancel(true);
  }

  initEntity() {
    this.itemEdit = new  Customer();
  }


  cancelEdit(): void {
    this._router.navigate([ '../../'], { relativeTo: this.route });
  }


  afterLoadItem(itm:  Customer) {
    super.afterLoadItem(itm);
    
    setTimeout( () => {
       this._colony.setZipCode(itm.colony.zipCode);
    }, 300);
  }


  loadCatalogs() {

        this._curService.loadQl(custQl, undefined)
        .subscribe(({data}) => {
          this.catResponsible = data['responsibles'];
          this.catCurrencies = data['currencies'];
        }, (error: Error) => {
          this._loadingService.resolve('');
          
          this._snackBarService.open(' Could not load ' + this.catalogName, 'Ok');
        }
        );   
  }



}
