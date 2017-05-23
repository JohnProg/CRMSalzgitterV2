import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';

import { Subject } from 'rxjs/Rx';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/reduce';

import { OneDriveAuth } from './auth';
import { Drive, Item } from './resources';

@Injectable()
export class OneDriveApi {

  private static API_URL = "https://api.onedrive.com/v1.0";

  constructor(private _http: Http, private _auth: OneDriveAuth) {

  }

  drives(): Observable<Array<Drive>> {
    return this._http.get(this.constructUrl("drives"))
      .map((res: Response) => res.json().value)
      .map((res: Array<any>) => res.reduce((list: Array<Drive>, obj) => {
        list.push(new Drive(obj));
        return list;
      }, []));
  }

  defaultDrive() {
    return this._http.get(this.constructUrl('drive'))
      .map((res: Response) => res.json())
      .map((res: any) => {
        return new Drive(res);
      });
  }

  /// which: [string] could be on of ['documents', 'photos', 'cameraroll', 'approot', 'music'] (see https://dev.onedrive.com/items/special_folders.htm for documentation)
  specialFolder(which: string) {
    return this._http.get(this.constructUrl('drive/special/' + which))
      .map((res: Response) => res.json())
      .map(res => new Item(res));
  }

  root(drive: Drive) {
    return this._http.get(this.constructUrl(drive.root))
      .map((res) => res.json())
      .map(res => new Item(res));
  }

  children(item: Item): Observable<Array<Item>> {
    return this._http.get(this.constructUrl(item.children))
      .map((res) => res.json().value)
      .map((res: Array<any>) => res.reduce((list: Array<Item>, obj) => {
        list.push(new Item(obj, item));
        return list;
      }, []));
  }

  item(id: string, parent?: Item) {
    return this._http.get(this.constructUrl('drive/items/' + id))
      .map(res => res.json())
      .map(res => new Item(res, parent ? parent : null))
  }

  thumbnail(item: Item, size: string = 'medium') {
    return this._http.get(this.constructUrl('drive/items/' + item.id + '/thumbnails') + "&select="+size)
      .map(res => res.json().value[0]);
  }

  // private:

  private constructUrl(path: string) {
    return OneDriveApi.API_URL + "/" + path + "?access_token=" + this._auth.token;
  }


}
