import { Component, OnInit, AfterViewInit, EventEmitter, Output, ViewChild, ContentChild, NgZone, ElementRef } from '@angular/core';
import { Title }     from '@angular/platform-browser';
import { ActionsService } from '../../services/actions.services';
import { Response, Http, Headers, URLSearchParams, QueryEncoder } from '@angular/http';
import { CatalogService, IPChangeEventSorted } from '../../services/catalog.service';
import { ConfigurationService } from '../../services/configuration.service';

import { Observable } from 'rxjs';
import { BaseComponent } from '../../catalogs/base.component';
import {  IPageChangeEvent } from '@covalent/core';
import { TdDataTableService, TdDataTableSortingOrder, ITdDataTableSortChangeEvent, ITdDataTableColumn,
   } from '@covalent/core/data-table';

import { TdSearchBoxComponent } from '@covalent/core/search';
import { TdLoadingService } from '@covalent/core/loading';
import { TdMediaService } from '@covalent/core/media';

import {  Company, Colony } from '../../model/allmodels';
import { SelectcolonyComponent } from '../../components/index';


import { Router, ActivatedRoute, Params, Data } from '@angular/router';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';



@Component({
  selector: 'crm-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.scss'],
   providers: [ ],
})
export class CompanyComponent extends BaseComponent {

  idCompany: number = 1;
  itemEdit: Company = new Company();
  zipCode: string = "";
  colony: Colony;
  @ViewChild(SelectcolonyComponent) _colony: SelectcolonyComponent;
  files: any;
  @ViewChild('imgRef') img:ElementRef;


  ngBeforeInit() {
    super.ngBeforeInit();
    this.catalogName = 'Company';
    this._curService.setAPI('Company/', this.catalogName, this.loadName);
    this.singleEditor = true;
    this.autoLoad = false;   
  }




  afterViewInit(): void {

    setTimeout( () => {
      if (this.idCompany > 0) {
        this.editEntity(this.idCompany);
      } else {
        this.addEntity();
      }      
    }, 50);

  }

  initEntity() {
    this.itemEdit = new  Company();
  }


  cancelEdit(): void {
    this._router.navigate([ '../'], { relativeTo: this.route });
  }


  afterLoadItem(itm:  Company) {
    super.afterLoadItem(itm);
    setTimeout(() => {
    this._colony.setZipCode(itm.colony.zipCode);
    }, 200);
    //this.img.nativeElement.src = "data:image/jpg;base64," + itm.logo;
  }


  loadCatalogs() {

        // this._curService.loadQl(custQl, undefined)
        // .subscribe(({data}) => {
        //   this.catResponsible = data['responsibles'];
        // }, (error: Error) => {
        //   this._loadingService.resolve('');
          
        //   this._snackBarService.open(' Could not load ' + this.catalogName, 'Ok');
        // }
        // );   
  }

  uploadFile(ffiles: FileList | File) {
    
    if (ffiles instanceof FileList) {
      
    } else {
        let reader: FileReader = new FileReader();
        let t: string;
        let tself = this;
        reader.onloadend = function () {
          
          t = reader.result.split(',')[1];
          tself.itemEdit.logo = t;
          //tself._curService.create(tself.itemEdit);
        };
        reader.readAsDataURL(ffiles);
    }
  }



}
