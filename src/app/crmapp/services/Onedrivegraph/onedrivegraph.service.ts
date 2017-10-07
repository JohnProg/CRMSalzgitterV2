import { Injectable } from '@angular/core';
import { ConfigurationService } from '../configuration.service';
import { environment } from '../../../../environments/environment';
import * as MicrosoftGraph from "@microsoft/microsoft-graph-types"
import * as request from 'superagent';
import * as moment from 'moment';
import {saveAs as importedSaveAs} from "file-saver";
import {
  TdLoadingService, TdDialogService
} from '@covalent/core';


@Injectable()
export class OnedrivegraphService {
   
  token: any;
  loadItem: string = 'document.load';
  constructor(
    public _confs: ConfigurationService,
    public _loadingService: TdLoadingService
  ) {
    this.token = this._confs.oneDriveToken;

   }

   getFolderInfo(parent:string, folderName: string) {
    return this.doRequest("/me/drive/root/search(q='" + folderName + "')");
   }

   getRootFolders() {
     let d = JSON.parse(localStorage.getItem('rootfolders'));
     return d;
   }

   getRootFolderInfo(folderName: string) {
    let root = this.getRootFolders();
    let v = root.find( r => r.name == folderName);
    return v;
  }

  GetChildFolderInfo(parent: string, folder: string, callback: { (finfo: MicrosoftGraph.DriveItem ): void })  {
    this._loadingService.register(this.loadItem);
    this.doRequest('me/drive/items/' + parent +'/children')
    .end((err, res) => {
        if (err) {
            console.error(err);
            this._loadingService.resolve(this.loadItem);
            return;
        }
        
        let childrens:[MicrosoftGraph.DriveItem] = res.body.value;

        let t = childrens.find(o => o.name == folder);
        if( t == null) {
          
          
          request
          .post(environment.oneDriveBase + 'me/drive/items/' + parent + '/children' )
          .send({
            "name": folder,
            "folder": { }
          })
          .set( 'Authorization', 'Bearer ' + this.token.access_token )
          .end((err, res) => {
            if (err) {
              console.error(err)
              return;
            }
            let fitem  = res.body;
            this._loadingService.resolve(this.loadItem);
            callback(fitem);
          })
        } else {
          this._loadingService.resolve(this.loadItem);
            callback(t);
        }
        
      });
    
  }

// appid "c090644ed523e594"
   doRequest(url: string) {
    this.token = this._confs.oneDriveToken;
     return request.get(environment.oneDriveBase + url)
     .set( 'Authorization', 'Bearer ' + this.token.access_token );
   }


   doDelete(itemId: string) {
    
    this.token = this._confs.oneDriveToken;
     return request.delete(environment.oneDriveBase + 'me/drive/items/' + itemId)
     .set( 'Authorization', 'Bearer ' + this.token.access_token );
   }

   uploadFile(parent: string, fileContent: any, 
              success: { (finfo: MicrosoftGraph.DriveItem ): void }, 
              error: { (finfo: MicrosoftGraph.DriveItem ): void } ) 
  {
    this._loadingService.register(this.loadItem);
    this.token = this._confs.oneDriveToken;
    let filename = this.removeSpeciaCharacters(fileContent.name);
    request.put(environment.oneDriveBase + 'me/drive/items/' + parent + '/children/' + filename + '/content')
    .set("Content-Type", fileContent.type)
    .set( 'Authorization', 'Bearer ' + this.token.access_token )
    .send(fileContent)
    .end((err, res) => {
      if (err) {
        this._loadingService.resolve(this.loadItem);
        error(err);
        return;
      }
      let fitem  = res.body;
      this._loadingService.resolve(this.loadItem);
      success(fitem)
    });
   }


   downloadFile(itemId: string, fileName: string) {
    this._loadingService.register(this.loadItem);
    this.token = this._confs.oneDriveToken;
     request.get(environment.oneDriveBase + 'me/drive/items/' + itemId + '/content' )

     .set( 'Authorization', 'Bearer ' + this.token.access_token )    
     .responseType('blob')
     .end((err, res) => {
      this._loadingService.resolve(this.loadItem);
      if (err) {
         return;
      }
      importedSaveAs( res.body, fileName);
    });
   }


   initOneDrive() {
    this.doRequest('me/drive/root/children')
    .end((err, res) => {
          
        if (err) {
            console.error(err);
            return;
        }
        
        let messages:[MicrosoftGraph.DriveItem] = res.body.value;
        let t = messages.find(o => o.name == environment.rootDocBase);
        if( t != null) {
          
          this.doRequest('me/drive/items/' + t.id +'/children')
          .end((err, res) => {
              if (err) {
                  console.error(err);
                  this._loadingService.resolve(this.loadItem);
                  return;
              }
              
              let childrens:[MicrosoftGraph.DriveItem] = res.body.value;
              localStorage.setItem('rootfolders', JSON.stringify( childrens));
              
              
            });        
        
        }

          //localStorage.setItem('rootfolders', JSON.stringify( messages));
      });
    
  }



  removeSpeciaCharacters(t: string) {
    if( t != '' && t != undefined) {
       return t.replace(/[^A-Z0-9._-]+/ig, "");
    }
    return '';
  }
}
