import { Component, NgZone, AfterViewInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Response, Http, Headers, URLSearchParams, QueryEncoder } from '@angular/http';
import { ConfigurationService } from '../crmapp/services/configuration.service';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';


@Component({
  selector: 'crm-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],

})
export class MainComponent implements AfterViewInit {




  _routeList: BehaviorSubject<Object[]>;

  routes: Observable<Object[]>;

  constructor(private _router: Router, 
              private _http: Http,
              private _confs: ConfigurationService ) {

    this._routeList = <BehaviorSubject<Object[]>>new BehaviorSubject([]);
    this.routes = this._routeList.asObservable();
    }




  logout(): void {
    this._router.navigate(['/login']);

  }

  ngAfterViewInit() {
     this._http.get(this._confs.appBase + '/data/crm-menu.json')
      .map((response) => response.json()).subscribe((result) => {
        
        this._routeList.next(result);
        
      }, (error) => {
         debugger
      });
  }
}
