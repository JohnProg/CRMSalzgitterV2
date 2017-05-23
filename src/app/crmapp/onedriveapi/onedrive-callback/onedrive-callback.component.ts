import { Component, OnInit,   NgZone, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ConfigurationService } from '../../services/configuration.service';
import { OneDriveAuth } from '../index';

@Component({
  selector: 'crm-onedrive-callback',
  templateUrl: './onedrive-callback.component.html',
  styleUrls: ['./onedrive-callback.component.scss']
})
export class OnedriveCallbackComponent implements OnInit {

  constructor(
        private _router: Router,
        private _route: ActivatedRoute,
        private _oauth: OneDriveAuth
  ) {
    debugger
    this._route.params.subscribe((params: { access_token: string, token_type: string, expires_in: number, scope: string, user_id: string }) => {
      debugger
      let d = params.access_token;
    });
   }

  ngOnInit() {}

}
