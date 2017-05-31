import { Component, OnInit } from '@angular/core';
import { AuthHelper } from '../authHelper/authHelper';
@Component({
  selector: 'crm-testonedrive',
  templateUrl: './testonedrive.component.html',
  styleUrls: ['./testonedrive.component.scss']
})
export class TestonedriveComponent implements OnInit {

  constructor(private _authHelper: AuthHelper) { }

  ngOnInit() {
  }


  doLogin() {
    this._authHelper.login();
  }
}
