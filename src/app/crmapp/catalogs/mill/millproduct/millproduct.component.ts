import { Component, OnInit, AfterViewInit, EventEmitter, Output, ViewChild, ContentChild, NgZone, Input } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActionsService } from '../../../services/actions.services';
import { Response, Http, Headers, URLSearchParams, QueryEncoder } from '@angular/http';
import { CatalogService, IPChangeEventSorted } from '../../../services/catalog.service';
import { ConfigurationService } from '../../../services/configuration.service';


import { Observable ,  Observer ,  BehaviorSubject } from 'rxjs';
import { BaseComponent,  } from '../../../catalogs/base.component';
import {
  IPageChangeEvent, TdDataTableService, TdDataTableSortingOrder,
  ITdDataTableSortChangeEvent, ITdDataTableColumn,
  TdLoadingService, TdDialogService, TdMediaService
} from '@covalent/core';


import { Router, ActivatedRoute } from '@angular/router';



import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
import {  GetProductsFromIdMill, MillProduct, Product } from '../../../model/index';

const productstQl = gql`
query {
  products { id name description }
}
`;

@Component({
  selector: 'crm-millproduct',
  templateUrl: './millproduct.component.html',
  styleUrls: ['./millproduct.component.scss']
})
export class MillproductComponent extends BaseComponent {
  
  @Input() idMill: number;
  itemEdit: MillProduct;
  productSelected: number[];
  loadName: string = 'millproduct.load';

  
loadData() {
  
    if ( this.isLoading === false ) {

      if ( this.dataLoaded === true ) {
        this.reloadPaged();
      } else {
        let pparams = new URLSearchParams();
        pparams.set('idmill', this.idMill.toString());
        this._curService.loadCustomAll('MillProduct/searchByMill', pparams);
        this.dataLoaded = true;
      }
    }
}


  ngBeforeInit() {
    super.ngBeforeInit();
    this.subEditor = true;
     this.catalogName = 'Products';
    this._curService.setAPI('MillProduct/', this.catalogName, this.loadName); 
  }



  initEntity() {
    this.itemEdit = new  MillProduct();
    this.itemEdit.idMill = this.idMill;
  }

  addColumns() {
    this.columns.push({ name: 'name', label: 'Name' });
    this.columns.push({ name: 'description', label: 'Description', tooltip: '' });
  }

  loadCatalogs() {

        this._curService.loadQl(productstQl, undefined)
        .subscribe(({data}) => {
          
          let t: Product[] = data['products'];
          if( t !== undefined) {
             this.catProduct = new Array<Product>();
             t.forEach( e => {
                   this.catProduct.push(e);
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
    debugger
    let t = this.productSelected;
    if ( form.valid &&  this.beforeSave() === true) {
      if( this.productSelected.length > 0 ) {
        let items = new Array<MillProduct>();
        this.productSelected.forEach(element => {
          let p = new MillProduct();
          p.idMill = this.idMill;
          p.idProduct = element;
          items.push(p);
        });
        this._curService.createArray(items);
      }
    } else {
      this._snackBarService.open('There are some errors, please review data ', 'Ok');
    }
  }

  afterLoadAll(itms: GetProductsFromIdMill[]) {
    this.isLoading = false;
    
    this.removeFromCatalog(itms);
  }

  ents: GetProductsFromIdMill[];
  notSelectedProducts: Product[];


  removeFromCatalog(items: GetProductsFromIdMill[] ) {

    this.ents = items || this.ents;
    if( this.catProduct !== undefined && this.ents !== undefined ) {
    this.notSelectedProducts = new Array<Product>();
    this.catProduct.forEach( element => {
        let idx = this.ents.findIndex( elem => { return elem.idProduct === element.id });
        if( idx < 0) {
            let tdx = <Product>this.catProduct.find( elem => { return elem.id === element.id })
            this.notSelectedProducts.push( tdx);
        } 
    });

    }
     this.productSelected= [];
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
