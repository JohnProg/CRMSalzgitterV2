import { Component, OnInit, Input, Output, AfterViewInit  } from '@angular/core';
import { CatalogService } from '../../services/catalog.service';
import { ConfigurationService } from '../../services/configuration.service';
import { TCRMEntity } from '../../model/allmodels';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';


@Component({
  selector: 'cbx-templateemail',
  templateUrl: './cbxtemplateemail.component.html',
  styleUrls: ['./cbxtemplateemail.component.scss'],
  providers: [CatalogService, ConfigurationService ]
})
export class CbxtemplateemailComponent implements OnInit {

 @Input() itemEdit: any;
  @Input() cplaceholder: string;

  tEmailList: TCRMEntity[];
  constructor(public _curService: CatalogService,public _confs: ConfigurationService) {
  }

  ngOnInit() {
    this.tEmailList = <TCRMEntity[]>  [
    ];

    this._curService.loadCatalog('TemplateEMail/', this.tEmailList, undefined);
  }

}
