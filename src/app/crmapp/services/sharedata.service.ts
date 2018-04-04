import { Injectable } from '@angular/core';
import {  TCRMEntity, Opportunity, QuotationFromSupplier, QuotationToCustomer,
          PurchaseOrder, Shipping, GetBaseQuote_Result } from '../model/index';
@Injectable()
export class SharedataService {

  loadField: string = '';
  search: GetBaseQuote_Result;
  opp: Opportunity;
  qfs: QuotationFromSupplier;
  qtc: QuotationToCustomer;
  po: PurchaseOrder;
  shp: Shipping;
  
  constructor() { }

}
