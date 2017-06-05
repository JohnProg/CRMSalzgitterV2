import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { ConfigurationService } from '../services/configuration.service';
import * as moment from 'moment';

@Injectable()
export class AuthGuard implements CanActivate {

    constructor(private router: Router,
                private _confs: ConfigurationService) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        //localStorage.removeItem('tokendata'); 
        let t = localStorage.getItem('tokendata');
        let u = localStorage.getItem('userInfo');
        if( t ) {
            this._confs.tokenData = JSON.parse(t);
            this._confs.userInfo = JSON.parse(u);
            if( this._confs.tokenData) {
                let d = moment(this._confs.tokenData['.expires']);
                let today = moment();
                if (d > today) {
                    // logged in so return true
                    return true;
                }
            }
        }
        // not logged in so redirect to login page with the return url
        this.router.navigate(['/login'], { queryParams: { returnUrl: state.url }});
        return false;
    }
}