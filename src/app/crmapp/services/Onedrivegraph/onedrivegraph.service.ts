import { Injectable } from '@angular/core';
import { ConfigurationService } from '../configuration.service';
import { environment } from '../../../../environments/environment';
import * as MicrosoftGraph from "@microsoft/microsoft-graph-types"
import * as request from 'superagent';
import * as moment from 'moment';

@Injectable()
export class OnedrivegraphService {
   
  token: any;
  constructor(
    public _confs: ConfigurationService
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
    this.doRequest('me/drive/items/' + parent +'/children')
    .end((err, res) => {
        if (err) {
            console.error(err)
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
            callback(fitem);
          })
        } else {
            callback(t);
        }
        
      });
    
  }

// appid "c090644ed523e594"
   doRequest(url: string) {
    
    
     return request.get(environment.oneDriveBase + url)
     .set( 'Authorization', 'Bearer ' + this.token.access_token );
   }


   uploadFile(parent: string, fileContent: any, 
              success: { (finfo: MicrosoftGraph.DriveItem ): void }, 
              error: { (finfo: MicrosoftGraph.DriveItem ): void } ) 
  {
    
    request.put(environment.oneDriveBase + 'me/drive/items/' + parent + '/children/' + fileContent.name + '/content')
    .set("Content-Type", fileContent.type)
    .set( 'Authorization', 'Bearer ' + this.token.access_token )
    .attach('file',fileContent, fileContent.name)
    .end((err, res) => {
      if (err) {
        error(err);
        return;
      }
      let fitem  = res.body;
      success(fitem)
    });
   }

   initOneDrive() {
    this.doRequest('me/drive/root/children')
    .end((err, res) => {
          
        if (err) {
            console.error(err);
            return;
        }
        let messages:[MicrosoftGraph.Message] = res.body.value;
        localStorage.setItem('rootfolders', JSON.stringify( messages));
      });
    
  }
}
