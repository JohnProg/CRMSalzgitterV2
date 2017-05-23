import { Directive, HostListener, ElementRef, OnInit } from "@angular/core";
import { CurrencyPipe } from '@angular/common';

@Directive({ selector: "[crmCurrencyFormatter]" })
export class CRMCurrencyFormatterDirective implements OnInit {

  private el: HTMLInputElement;

  constructor(
    private elementRef: ElementRef,
    private currencyPipe: CurrencyPipe
  ) {
    this.el = this.elementRef.nativeElement;
  }

  ngOnInit() {
    this.el.value = this.currencyPipe.transform(this.el.value);
  }

  @HostListener("focus", ["$event.target.value"])
  onFocus(value) {
      
    this.el.value = value; //this.currencyPipe.(value); // opossite of transform
  }

  @HostListener("blur", ["$event.target.value"])
  onBlur(value) {
    this.el.value = this.currencyPipe.transform(value);
  }

}