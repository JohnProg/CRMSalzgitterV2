import {Component, Injectable,Input,Output,EventEmitter} from '@angular/core'
import {  Opportunity, QuotationFromSupplier, QuotationToCustomer, PurchaseOrder,
  GetFieldForPurchaseOrder_Result
  } from '../model/allmodels';


@Injectable()
export class OpportunityService {
    currentOpp: Opportunity;
    currentQFS: QuotationFromSupplier;
    currentQTS: QuotationToCustomer;
    currentPO: PurchaseOrder;
    currentFields: GetFieldForPurchaseOrder_Result;
}