import {Component, Injectable,Input,Output,EventEmitter} from '@angular/core'
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import { IPageChangeEvent } from '@covalent/core';
import { User } from '../model/index';
import { IDeleteEventModel } from '../model/deleteeventmodel';
import { ConfigurationService } from './configuration.service';

@Injectable()
export class ActionsService {
  
    public addItemEvent: EventEmitter<any>=new EventEmitter();
    public editItemEvent: EventEmitter<any>=new EventEmitter();
    public saveItemEvent: EventEmitter<any> =new EventEmitter();
    public deleteItemEvent: EventEmitter<IDeleteEventModel> = new EventEmitter();
    public deleteItemConfirmedEvent: EventEmitter<IDeleteEventModel>=new EventEmitter();
    public cancelEditEvent: EventEmitter<any>=new EventEmitter();
    public setEditEvent: EventEmitter<any>=new EventEmitter();


    public updateTitleEvent: EventEmitter<string>=new EventEmitter<string>();
    public searchEvent: EventEmitter<string>=new EventEmitter<string>();
    public showSearchEvent: EventEmitter<boolean>=new EventEmitter<boolean>();
    public showAddEvent: EventEmitter<boolean>=new EventEmitter<boolean>();
    public showSaveEvent: EventEmitter<boolean>=new EventEmitter<boolean>();
    public showCancelEvent: EventEmitter<boolean>=new EventEmitter<boolean>();
    public showSideNavEvent: EventEmitter<boolean>=new EventEmitter<boolean>();


    public showEmailEvent: EventEmitter<boolean>=new EventEmitter<boolean>();
    public sendEmailEvent: EventEmitter<any>=new EventEmitter<any>();
 


    _screenSizeChangeEvent: BehaviorSubject<IPageChangeEvent> =  <BehaviorSubject<IPageChangeEvent>>new BehaviorSubject({ page: 0, pageSize: 13 }); 
    screenSizeChangeEvent: Observable<IPageChangeEvent> = this._screenSizeChangeEvent.asObservable();


    public userInfoEvent: EventEmitter<User>=new EventEmitter<User>();
    


    constructor(private _confs : ConfigurationService) {

    }

    newGuid() {
      return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
          var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
          return v.toString(16);
      });
    }

    public setUserInfo(user: User) {
      this._confs.userInfo = user;
      localStorage.setItem('userInfo', JSON.stringify(user));
      this.userInfoEvent.emit(user);
    }
    public addItem() {
      this.addItemEvent.emit();
    }


    public saveItem() {
      this.saveItemEvent.emit();
    }

    public deleteItem(e: IDeleteEventModel) {
      
      this.deleteItemEvent.emit(e);
    }

    public deleteItemConfirmed(e: IDeleteEventModel) {
         this.deleteItemConfirmedEvent.emit(e);
    }

    public cancelEdit() {
      this.cancelEditEvent.emit();
    }

    public setEdit(e: any = undefined) {

      this.setEditEvent.emit(e);
    }

    public updateTitle(atitle: string) {
      this.updateTitleEvent.emit(atitle);
    }


    public search(afilter: string) {
      
        this.searchEvent.emit(afilter);
    }


    public showSearch(ashow: boolean) {
      this.showSearchEvent.emit(ashow);
    }

    public showAdd(ashow: boolean) {
      this.showAddEvent.emit(ashow);
    }

    public showSave(ashow: boolean) {
      this.showSaveEvent.emit(ashow);
    }

    public showCancel(ashow: boolean) {
      setTimeout(() => {
      this.showCancelEvent.emit(ashow);
      }, 50);
    }

    public showSideNav(ashow: boolean) {
      this.showSideNavEvent.emit(ashow);
    }

    public screenSizeChange(e: IPageChangeEvent) {
      this._screenSizeChangeEvent.next(e);
    }


    public showEmail(show: boolean): void {
      this.showEmailEvent.emit(show);
    }

    public sendEMail(): void {
      this.sendEmailEvent.emit();
    }


}