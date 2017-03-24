import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';



@Injectable()
export class ConfigurationService {
    public server: string = environment.server;
    public appBase: string = environment.appBase;
    public apiUrl: string = 'api/';
    public apiCsutomUrl: string = 'apicustom/';
    public serverWithApiUrl = this.server + this.apiUrl;
    public serverWithApiCustomUrl = this.server + this.apiCsutomUrl;
    public pageSize: number = 5;
    public hideDelayToast: number = 2000;
}
