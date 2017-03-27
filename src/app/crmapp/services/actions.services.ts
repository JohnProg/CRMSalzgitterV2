import {Component, Injectable,Input,Output,EventEmitter} from '@angular/core'

@Injectable()
export class ActionsService {
    @Output() addItemEvent:EventEmitter<any>=new EventEmitter();
    @Output() editItemEvent:EventEmitter<any>=new EventEmitter();

    @Output() deleteItemEvent : EventEmitter<any> =new EventEmitter();
    @Output() saveItemEvent : EventEmitter<any> =new EventEmitter();
  


    @Output() deleteItemConfirmedEvent : EventEmitter<any>=new EventEmitter();

    @Output() updateTitleEvent : EventEmitter<string>=new EventEmitter<string>();
    @Output() searchEvent : EventEmitter<string>=new EventEmitter<string>();
    
    @Output() showSearchEvent : EventEmitter<boolean>=new EventEmitter<boolean>();
    @Output() showAddEvent : EventEmitter<boolean>=new EventEmitter<boolean>();
    @Output() showSaveEvent : EventEmitter<boolean>=new EventEmitter<boolean>();
    @Output() showCancelEvent : EventEmitter<boolean>=new EventEmitter<boolean>();
    @Output() showSideNavEvent : EventEmitter<boolean>=new EventEmitter<boolean>();



    updateTitle(atitle: string) {
      this.updateTitleEvent.emit(atitle);
    }

    showSearch(ashow: boolean) {
      this.showSearchEvent.emit(ashow);
    }

    showAdd(ashow: boolean) {
      this.showAddEvent.emit(ashow);
    }

    showSave(ashow: boolean) {
      this.showSaveEvent.emit(ashow);
    }

    showCancel(ashow: boolean) {
      this.showCancelEvent.emit(ashow);
    }

    showSideNav(ashow: boolean) {
      this.showSideNavEvent.emit(ashow);
    }
  
    addItem() { 
       return this.addItemEvent; 
    }

    editItem() {
        return this.editItemEvent;
     }


    deleteItem() {
        return this.deleteItemEvent;
     }

     saveItem() {
       return this.saveItemEvent;
     }

     deleteItemConfirmed() {
         this.deleteItemConfirmedEvent.emit();
     }

     search(afilter: string) {
        this.searchEvent.emit(afilter);
     }

}