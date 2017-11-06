import { Component, OnInit, AfterViewInit, EventEmitter, Output, ViewChild, ContentChild, NgZone, Input } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActionsService } from '../../../../services/actions.services';
import { Response, Http, Headers, URLSearchParams, QueryEncoder } from '@angular/http';

import { CatalogService, IPChangeEventSorted, CURRENCY_FORMAT, NUMBER_FORMAT } from '../../../../services/catalog.service';
import { ConfigurationService } from '../../../../services/configuration.service';
import { OpportunityDetailSumary, OpportunityDetailSumaryProperty, Property, TCRMEntity, ProductProperty, EditorDetailSumaryProperty } from '../../../../model/allmodels';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';
import { BaseComponent } from '../../../../catalogs/base.component';
import {
  IPageChangeEvent, TdDataTableService, TdDataTableSortingOrder,
  ITdDataTableSortChangeEvent, ITdDataTableColumn,
  TdLoadingService, TdDialogService, TdMediaService
} from '@covalent/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';


import { Router, ActivatedRoute } from '@angular/router';
import { AbstractValueAccessor, EditordetailsumaryComponent } from '../../../../components/index';
import {TranslateService} from '@ngx-translate/core';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';



const findCustProdProp = gql`
  query 
        findCustomerProductProperties($idcustproduct: Int!) {
            findCustomerProductProperties(idcustproduct: $idcustproduct) { idProperty propertyValue } 
        }
`;


@Component({
  selector: 'crm-opportunitydetailsumary',
  templateUrl: '../../../../components/editordetailsumary/editordetailsumary.component.html',
  styleUrls: ['./opportunitydetailsumary.component.scss']
})
export class OpportunitydetailsumaryComponent extends EditordetailsumaryComponent {

  itemEdit: OpportunityDetailSumary;
  allowPropEdit: boolean = true;
  @Input() idCustomerProduct: number = 0;
  


  
  // ngBeforeInit() {
  //   super.ngBeforeInit();
  //    this.catalogName = 'Opp Details Sumary';
  //   this._curService.setAPI('OpportunityDetailSumary', this.catalogName, this.loadName);
  //   this.refreshItemUrl = 'OpportunityDetailSumary/searchByDetail';
  //   this.sumProperties = 'opportunityDetailSumaryProperties'; 
  // }

  initEntity() {
    this.itemEdit = new OpportunityDetailSumary() ;
    this.itemEdit.idOpportunityDetail  = this.idDetail;
    this.itemEdit.dateCreated = new Date();
    this.itemEdit.price = this.price;
    this.itemEdit.quantity = this.maxQty;
    this.initDetails();
  }


 prepareToSave() {
    this.pdetails.forEach( (t: OpportunityDetailSumaryProperty[]) => {
      this.itemEdit.opportunityDetailSumaryProperties = new Array<OpportunityDetailSumaryProperty>();
      t.forEach( (o: OpportunityDetailSumaryProperty ) => {
            let p: OpportunityDetailSumaryProperty = new OpportunityDetailSumaryProperty();
            p.idOpportunityDetailSumary = o.idOpportunityDetailSumary;
            p.idProperty = o.idProperty;
            p.propertyValue = o.propertyValue;
            this.itemEdit.opportunityDetailSumaryProperties.push(p);
      });
    });
 }


  setPropertyValues(details: EditorDetailSumaryProperty[] ) {
        this._curService.loadQl(findCustProdProp, { idcustproduct: this.idCustomerProduct })
      .subscribe(({data}) => {
        let pdata = data['findCustomerProductProperties'];
        pdata.forEach( (element: EditorDetailSumaryProperty) => {
           let pid = details.filter( i => i.idProperty === element.idProperty)[0];
           if( pid != null) {
             pid.propertyValue = element.propertyValue;
           }
        });
        this.itemEdit.quantity = this.maxQty - this.total;
        this.itemEdit.price = this.price;
        this.itemEdit.amount = this.itemEdit.quantity * this.itemEdit.price;
        if(pdata.length > 0) {
           this.allowPropEdit = false;
        }
      }, (error: Error) => {
        this._loadingService.resolve('');
        debugger
        this._snackBarService.open(' Could not load ' + this.catalogName, 'Ok');
      }
      ); 
  }

}
