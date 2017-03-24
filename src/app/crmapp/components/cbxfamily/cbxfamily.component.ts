import { Component, OnInit, Input, Output, AfterViewInit  } from '@angular/core';
import { CatalogService } from '../../services/catalog.service';
import { ConfigurationService } from '../../services/configuration.service';
import { TCRMEntity } from '../../model/allmodels';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';


@Component({
  selector: 'cbx-family',
  templateUrl: './cbxfamily.component.html',
  styleUrls: ['./cbxfamily.component.scss'],
  providers: [CatalogService, ConfigurationService ]
})
export class CbxfamilyComponent implements OnInit {

 @Input() itemEdit: any;
 @Input() cplaceholder: string;
  familyList: TCRMEntity[];
  constructor(public _curService: CatalogService,public _confs: ConfigurationService) {
  }

  ngOnInit() {
    this.familyList = <TCRMEntity[]>  [
    ];

    this._curService.loadCatalog('Family/', this.familyList, undefined);
  }

}
