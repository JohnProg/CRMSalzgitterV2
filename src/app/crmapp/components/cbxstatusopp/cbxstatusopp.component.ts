import { Component, OnInit, Input, Output, AfterViewInit  } from '@angular/core';
import { CatalogService } from '../../services/catalog.service';
import { ConfigurationService } from '../../services/configuration.service';
import { TCRMEntity } from '../../model/allmodels';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'cbx-statusopp',
  templateUrl: './cbxstatusopp.component.html',
  styleUrls: ['./cbxstatusopp.component.scss'],
  providers: [CatalogService, ConfigurationService ]
})
export class CbxstatusoppComponent implements OnInit {

  @Input() itemEdit: any;
  @Input() cplaceholder: string;
  @Input() itmrequired: boolean;
  oppStatusList: TCRMEntity[];
  constructor(public _curService: CatalogService,public _confs: ConfigurationService) {
  }

  ngOnInit() {
    this.oppStatusList = <TCRMEntity[]>[ ];

    this._curService.loadCatalog('StatusOpportunity/', this.oppStatusList, undefined);
  }

}
