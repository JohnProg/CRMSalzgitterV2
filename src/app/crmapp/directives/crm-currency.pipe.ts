import {
  Input,
  Directive,
  HostListener,
  ElementRef,
  Renderer,
  OnInit
} from '@angular/core';
import { NgModel } from '@angular/forms';
import { CurrencyPipe } from '@angular/common';

@Directive({
  selector: '[currencyInput]',
  providers: [NgModel],
  host: {
    '(input)': 'onInputChange()'
  }
})
export class CurrencyInputDirective  implements OnInit {
  @Input() ngModel: number;

  private elem: HTMLInputElement;

  constructor(
    private el: ElementRef,
    private render: Renderer,
    private currencyPipe: CurrencyPipe,
    private model: NgModel,
  ) {
    this.elem = el.nativeElement;
  }

  ngOnInit() {
    debugger
    this.elem.value = this.currencyPipe.transform(parseFloat(this.elem.value || '0'), 'USD', true);
  }

  ngAfterContentInit() {

      this.model.valueChanges.subscribe(value => {
        debugger
        if(value) {
          const parsed = parseFloat(value.replace('$', ""));
          let c = new CurrencyPipe('en').transform(parsed, 'USD', true);
          this.model.valueAccessor.writeValue(c);
        }
      })
    }


  @HostListener('focus', ['$event.target.value'])
  onFocus(value: string) {
    this.elem.value = value.replace(/\,/g, '');
  }

  @HostListener('blur', ['$event.target.value'])
  onBlur(value: string) {
    this.elem.value = this.currencyPipe.transform(parseFloat(value), 'USD', true);
  }
}