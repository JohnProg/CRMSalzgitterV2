import {Component, Injectable,Input,Output,EventEmitter} from '@angular/core'
import { BehaviorSubject ,  Observable } from 'rxjs';
import { IPageChangeEvent } from '@covalent/core';
import { User } from '../model/index';
import { IDeleteEventModel } from '../model/deleteeventmodel';
import { ConfigurationService } from './configuration.service';
import { ICRMPageChangeEvent } from '../extensions';
@Injectable()
export class ActionsService {
  
    public addItemEvent: EventEmitter<any>=new EventEmitter();
    public editItemEvent: EventEmitter<any>=new EventEmitter();
    public saveItemEvent: EventEmitter<any> =new EventEmitter();
    public deleteItemEvent: EventEmitter<IDeleteEventModel> = new EventEmitter();
    public deleteItemConfirmedEvent: EventEmitter<IDeleteEventModel>=new EventEmitter();
    public cancelEditEvent: EventEmitter<any>=new EventEmitter();
    public setEditEvent: EventEmitter<any>=new EventEmitter();
    

    public updateTitleEvent: EventEmitter<any>=new EventEmitter<any>();
    public searchEvent: EventEmitter<string>=new EventEmitter<string>();
    public showSearchEvent: EventEmitter<boolean>=new EventEmitter<boolean>();
    public showAddEvent: EventEmitter<boolean>=new EventEmitter<boolean>();
    public showSaveEvent: EventEmitter<boolean>=new EventEmitter<boolean>();
    public showCancelEvent: EventEmitter<boolean>=new EventEmitter<boolean>();
    public showSideNavEvent: EventEmitter<boolean>=new EventEmitter<boolean>();


    public showEmailEvent: EventEmitter<boolean>=new EventEmitter<boolean>();
    public sendEmailEvent: EventEmitter<any>=new EventEmitter<any>();
 
    public showFilterPanelEvent: EventEmitter<any>=new EventEmitter();
    public showFilterButtonEvent: EventEmitter<any>=new EventEmitter();
    

    public showEmailEventButton: EventEmitter<boolean>=new EventEmitter<boolean>();
    _screenSizeChangeEvent: BehaviorSubject<ICRMPageChangeEvent> =  <BehaviorSubject<ICRMPageChangeEvent>>new BehaviorSubject({ page: 0, pageSize: 13 }); 
    screenSizeChangeEvent: Observable<ICRMPageChangeEvent> = this._screenSizeChangeEvent.asObservable();


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

    public emitUserInfo() {
      let user = JSON.parse(localStorage.getItem('userInfo'));
      this._confs.userInfo = user;
      this.userInfoEvent.emit(this._confs.userInfo);
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

    public updateTitle(title: any) {
      
      this.updateTitleEvent.emit({ action: title.action, title: title.title, tparam: title.tparam });
    }


    public search(afilter: string) {
      
        this.searchEvent.emit(afilter);
    }


   
    public showSearch(ashow: boolean) {
      this.showSearchEvent.emit(ashow);
    }

    public showFilterPanel() {
      this.showFilterPanelEvent.emit();
    }

    public showFilterButton(e: boolean) {
      this.showFilterButtonEvent.emit(e);
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

    public screenSizeChange(e: ICRMPageChangeEvent) {
      this._screenSizeChangeEvent.next(e);
    }


    public showEmail(show: boolean): void {
      this.showEmailEvent.emit(show);
    }

    public sendEMail(): void {
      this.sendEmailEvent.emit();
    }


}