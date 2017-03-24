import { Component, OnInit, Input, Output, AfterViewInit  } from '@angular/core';
import { CatalogService } from '../../services/catalog.service';
import { ConfigurationService } from '../../services/configuration.service';
import { TCRMEntity } from '../../model/allmodels';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';


@Component({
  selector: 'cbx-colony',
  templateUrl: './cbxcolony.component.html',
  styleUrls: ['./cbxcolony.component.scss'],
    providers: [CatalogService, ConfigurationService ]
})
export class CbxcolonyComponent implements OnInit {

@Input() itemEdit: any;
 @Input() cplaceholder: string;
 @Input() zipCode: string = "";
  colonyList: TCRMEntity[];
  constructor(public _curService: CatalogService,public _confs: ConfigurationService) {
  }

  ngOnInit() {
    this.colonyList = <TCRMEntity[]>  [
    ];

    
  }

  reloadFromZipCode(zip: string ) {
    let p = Array<TCRMEntity>();
    let s = new TCRMEntity();
    s.Name = "zipcode";
    s.Description = zip;
    p.push( s );
      this._curService.loadCatalog('Colony/', this.colonyList, p);
  }

}
