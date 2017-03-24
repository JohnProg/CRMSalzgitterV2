import { Component, OnInit, Input, Output, AfterViewInit  } from '@angular/core';
import { CatalogService } from '../../services/catalog.service';
import { ConfigurationService } from '../../services/configuration.service';
import { TCRMEntity } from '../../model/allmodels';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';


@Component({
  selector: 'cbx-statusbid',
  templateUrl: './cbxstatusbid.component.html',
  styleUrls: ['./cbxstatusbid.component.scss'],
  providers: [CatalogService, ConfigurationService ]
})
export class CbxstatusbidComponent implements OnInit {

 @Input() itemEdit: any;
 @Input() cplaceholder: string;
  bidStatusList: TCRMEntity[];
  constructor(public _curService: CatalogService,public _confs: ConfigurationService) {
  }

  ngOnInit() {
    this.bidStatusList = <TCRMEntity[]>  [
    ];

    this._curService.loadCatalog('StatusBid/', this.bidStatusList, undefined);
  }


}
