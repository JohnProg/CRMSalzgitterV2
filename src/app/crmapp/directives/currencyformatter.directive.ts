import { Directive, HostListener, ElementRef, OnInit } from "@angular/core";
import { NgControl } from '@angular/forms'
import { CRMCurrencyPipe } from "./crm-currency.pipe";

@Directive({ selector: "[ngModel][crmCurrencyFormatter]" })
export class CRMCurrencyFormatterDirective implements OnInit {

  private el: HTMLInputElement;
  
  constructor(
    private control: NgControl,
    private currencyPipe: CRMCurrencyPipe
  ) {
  }

  ngOnInit() {
    setTimeout( () => {
      let formatted = this.currencyPipe.transform(this.control.value);
      this.control.valueAccessor.writeValue(formatted);
    }, 0);
  }

  @HostListener("focus", ["$event.target.value"])
  onFocus(value) {
    this.control.valueAccessor.writeValue(this.control.value);
    //this.control.viewToModelUpdate(this.control.value);
  }

  @HostListener("blur", ["$event.target.value"])
  onBlur(value) {
    let val = this.control.value === '' ? '0.00' : this.control.value.toString();
    let raw =  this.currencyPipe.parse(val);
    let formatted = this.currencyPipe.transform(raw);
    this.control.valueAccessor.writeValue(formatted);
    //this.control.viewToModelUpdate(raw);
  }

  @HostListener("ngModelChange", ["$event"])
  onInputChange(value) {
    //this.el.value = this.currencyPipe.transform(value);

    //let raw =  this.currencyPipe.parse(value);
    //if (value !== raw) {
       //this.control.viewToModelUpdate(raw);  
    //}
  }

}