import {Component, Injectable,Input,Output,EventEmitter} from '@angular/core'

@Injectable()
export class ActionsService {
    public addItemEvent:EventEmitter<any>=new EventEmitter();
    public editItemEvent:EventEmitter<any>=new EventEmitter();
    public saveItemEvent : EventEmitter<any> =new EventEmitter();
    public deleteItemEvent : EventEmitter<any> =new EventEmitter();
    public deleteItemConfirmedEvent : EventEmitter<any>=new EventEmitter();
    public cancelEditEvent : EventEmitter<any>=new EventEmitter();


    public updateTitleEvent : EventEmitter<string>=new EventEmitter<string>();
    public searchEvent : EventEmitter<string>=new EventEmitter<string>();
    public showSearchEvent : EventEmitter<boolean>=new EventEmitter<boolean>();
    public showAddEvent : EventEmitter<boolean>=new EventEmitter<boolean>();
    public showSaveEvent : EventEmitter<boolean>=new EventEmitter<boolean>();
    public showCancelEvent : EventEmitter<boolean>=new EventEmitter<boolean>();
    public showSideNavEvent : EventEmitter<boolean>=new EventEmitter<boolean>();
    public screenSizeChangeEvent: EventEmitter<any> = new EventEmitter<any>();

    public addItem() {
      this.addItemEvent.emit();
    }

    public editItem() {
      this.editItemEvent.emit();
    }

    public saveItem() {
      this.saveItemEvent.emit();
    }

    public deleteItem() {
      this.deleteItemEvent.emit();
    }

    public deleteItemConfirmed() {
         this.deleteItemConfirmedEvent.emit();
    }

    public cancelEdit() {
      this.cancelEditEvent.emit();
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
      this.showCancelEvent.emit(ashow);
    }

    public showSideNav(ashow: boolean) {
      this.showSideNavEvent.emit(ashow);
    }

    public screenSizeChange(e: any) {
      this.screenSizeChangeEvent.emit(e);
    }




}