import { Component, Input, OnInit, Output, EventEmitter, Injector, OnChanges, SimpleChange, SimpleChanges, forwardRef, ViewEncapsulation } from '@angular/core';
import { ControlValueAccessor, NG_VALIDATORS, NG_VALUE_ACCESSOR } from '@angular/forms';
import { FormFieldType } from '../../constant/form-field-types';
import { BaseFormFieldId } from '../Base-Form-Field-Id';
import { NgbTooltip } from '@ng-bootstrap/ng-bootstrap';
import { NgClass, NgIf } from '@angular/common';

@Component({
    selector: 'app-form-field-input',
    templateUrl: './form-field-input.component.html',
    styleUrls: ['./form-field-input.component.css'],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => FormFieldInputComponent),
            multi: true,
        }
    ],
    standalone: true,
    imports: [
        NgClass,
        NgIf,
        NgbTooltip,
    ],
})
export class FormFieldInputComponent extends BaseFormFieldId implements OnInit, ControlValueAccessor, OnChanges {
  public prependString: string = FormFieldType.TEXT

  @Input() label: string = "";
  @Input() help: string = "";
  @Input() value: string = "";
  @Input() placeholder: string = "";
  @Input() errorMsg: string = "";
  @Input() required: boolean = false;
  @Input() readonly: boolean = false;
  @Input() inputClass: string = "";
  @Input() type: string = "";
  @Input() mode: string = "input";
  @Input() disabled: string = "";
  @Output() changes: EventEmitter<string> = new EventEmitter();
  
  
  constructor(private _injector: Injector) {
      super(_injector);
   }

  onTouched = () => {};
  propagateChange = (_: any) => {};


  ngOnInit(): void {
    this.initSelfControlReference();
    this.setIdValues();
  }

  ngOnChanges(changes: SimpleChanges): void{
    const{ errorMsg, idString} = changes;
    if(errorMsg && errorMsg.currentValue != errorMsg.previousValue){
      this.errorMsg = errorMsg.currentValue;
    }
    this.checkIdStringChange(idString);
  }
  writeValue(obj: any): void {
    this.value = obj;
  }
  registerOnChange(fn: any): void {
    this.propagateChange = fn;
  }
  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }
  onBlur(){
    this.onTouched();
  }
  onChange($event: any){
    this.changes.emit($event.target.value);
  }
  setDisabledState?(isDisabled: boolean): void {
    this.readonly = isDisabled;
  }
  onTextKeyUp($event: any): void {
    this.value = $event.target.value;
    this.propagateChange(this.value);
    this.onTouched();
  }

}
 