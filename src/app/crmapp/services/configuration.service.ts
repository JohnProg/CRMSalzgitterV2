import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';



@Injectable()
export class ConfigurationService {
    public server: string = environment.server;
    public appBase: string = environment.appBase;
    public apiUrl: string = 'api/';
    public apiCsutomUrl: string = 'customapi/';
    public serverWithApiUrl = this.server + this.apiUrl;
    public serverWithApiCustomUrl = this.server + this.apiCsutomUrl;
    public pageSize: number = 5;
    public hideDelayToast: number = 2000;
    public currentPage: number = 0;

}
