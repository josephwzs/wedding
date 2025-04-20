import { Component, Injector, Input, SimpleChange } from "@angular/core";
import { UntypedFormControl, NgControl } from "@angular/forms";
import { FormFieldType } from "../constant/form-field-types";

@Component({
    template: "",
})
export abstract class BaseFormFieldId {
    
public selfControl?: UntypedFormControl;

public selfControlName: string = "";

@Input() idString: string = "";

public abstract prependString: string;

public elementId: string = "";

public elementId_toggle: string = "";

public readonlyId: string = "";

constructor(public injector: Injector){
    
}


public checkIdStringChange(idStringChange: SimpleChange): void {
    if(idStringChange && idStringChange.currentValue !== idStringChange.previousValue){
        const complutedId: string = this.idString || this.generateRanId();
        this.createElementIds(complutedId);
    }
}

generateRanId = (): string => `${new Date().getTime()}${Math.floor(Math.random() * 100)}`

public initSelfControlReference(): void{
    const ngControl: NgControl | null = this.injector.get(NgControl, null);
    if(ngControl){
        this.selfControl = ngControl.control as UntypedFormControl;
        this.selfControlName = ngControl.name?.toString() || "";
    }
}

public setIdValues(){
    if(this.idString){
        const computedId: string = this.selfControlName || this.generateRanId();
        this.createElementIds(computedId)
    }
}
public createElementIds(computedId: string): void{
    this.elementId = `${this.prependString}_${computedId}`;
    this.elementId_toggle = `${this.prependString}_${computedId}_toggle`;
    this.readonlyId = `${FormFieldType.DATA_TITLE}_${computedId}`;
}

}