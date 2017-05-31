import {Component, Injectable,Input,Output,EventEmitter} from '@angular/core'
import {  Opportunity, QuotationFromSupplier  } from '../model/allmodels';


@Injectable()
export class OpportunityService {
    currentOpp: Opportunity;
    currentQFS: QuotationFromSupplier
}