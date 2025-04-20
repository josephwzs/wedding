import { Component, ViewChild } from "@angular/core";
import { AbstractControlOptions, UntypedFormArray, FormArrayName, UntypedFormBuilder, UntypedFormGroup } from "@angular/forms";
import { ReplaySubject } from "rxjs";
import { ViewMode } from "../constant/ViewMode";
import { BaseFormComponent } from "../shared/base-form/base-form.component";
import { RootForm } from "./root-form";
import { AppConfigService } from "./service/app-config.service";
import { StringService } from "./string.service";
import * as arrayUtils from "./utils/array-utils";
import * as formUtils from "./utils/form-utils";


@Component({
    template: "",
})
export class Form<DomainDataType> implements RootForm<DomainDataType> {
    screenLabels: StringService;
    formGroup!: UntypedFormGroup;
    fieldChanges: string[] = [];
    private originalValue: any = {};
    protected formBuilder: UntypedFormBuilder;
    protected maxCount: number = 10;
    formGroupSubject = new ReplaySubject();

    model!: DomainDataType;
    formFieldMode: string = "input";
    uniqueFieldMode: string = "input";
    @ViewChild('baseFormComponent', { static: true}) baseFormComponent!: BaseFormComponent


constructor(
    formBuilder: UntypedFormBuilder,
    screenLabels: StringService
    ){
        this.screenLabels = screenLabels;
        this.formBuilder = formBuilder;
        const urlPath = window.location.pathname.split("/");
        const mode = urlPath[urlPath.length -1];
        if(mode == ViewMode.DELETE || mode == ViewMode.VIEW){
            this.formFieldMode = "view";
            this.uniqueFieldMode = "view";
        }
        if(mode == ViewMode.EDIT){
            this.uniqueFieldMode = "view";
        }
    }
    getModel(): DomainDataType {
        return this.model;
    }

    createFormGroup(controlsConfig: { [key: string]: any; }, options?: AbstractControlOptions | null): void {
        this.formGroup = this.formBuilder.group(controlsConfig, options);
        this.originalValue = this.formGroup.getRawValue()
        this.formGroupSubject.next(this.formGroup);
    }
    getFormValue(): DomainDataType {
        return this.formGroup.getRawValue()
    }
    prepareCacheData(data: any){
        return data;
    }
    setFormValue(formValue: any, isOriginal?: boolean): void {
        // const _formValue = formValue as typeof ;
        this.formGroup?.patchValue(formValue);
        if(isOriginal){ this.originalValue = this.formGroup.getRawValue()}
    }
    resetFormValue(): void {
        this.formGroup.patchValue(this.originalValue);
        this.formGroup.markAsPristine()
        this.formGroup.markAsUntouched()
    }
    clearFormValue(): void {
        this.formGroup.reset()
    }
    isFormChanges(): boolean {
        return this.fieldChanges.length > 0
    }
    getOriginalFormValue() {
        return this.originalValue;
    }
    isFormValid(): boolean {
        return this.formGroup.valid;
    }
    isFormDirty(): boolean {
        return this.formGroup.dirty;
    }
    clearFieldValue(formControlName: string): void {
        this.formGroup.controls[formControlName].reset();
    }
    setFieldValue(formControlName: string, fieldValue: any): void {
        this.formGroup.patchValue({
            [formControlName]: fieldValue,
        })
    }
    hasError(formControlName: string): boolean {
        const { controls } = this.formGroup;
        return (
            controls[formControlName].errors != null &&
            (controls[formControlName].dirty &&
                controls[formControlName].touched)
        )
    }
    getErrorMessage(formControlName: string, customError?: any): string {
        if (this.hasError(formControlName)){
            return formUtils.getErrorMessage(this.formGroup, formControlName, this.screenLabels, customError)
        }else{
            return "";
        }
    }
    listenValueChanges(): void {
        const { controls } = this.formGroup;
        for (let formControlName in controls){
            if(controls[formControlName] instanceof UntypedFormArray){
                continue
            }
            controls[formControlName].valueChanges.subscribe(()=> {
                const isEqual = this.compareValueChange(
                    this.originalValue[formControlName],
                    controls[formControlName].value
                );
                const formControlNameIndex = this.fieldChanges.indexOf(formControlName);
                if(isEqual){
                    if(formControlNameIndex != -1) this.fieldChanges.splice(formControlNameIndex, 1);
                }else{
                    if(formControlNameIndex == -1) this.fieldChanges.push(formControlName);
                }
            })
        }
    }

    private compareValueChange( initialValue: any, targetValue: any): boolean{
        if (initialValue instanceof Date){
            initialValue = initialValue.getTime();
            targetValue = targetValue.getTime();
        
        } else if (initialValue instanceof Array){
            initialValue = arrayUtils.sortAndtoString(initialValue);
            targetValue = arrayUtils.sortAndtoString(targetValue);
        }
        return initialValue == targetValue;
    }

    addedNestedFrom(
        formArrayName: string,
        formGroupIdentifier: string[],
        autoGeneratedId: boolean,
        controlsConfig: { [key:string]: any },
        options?: AbstractControlOptions | null
    ){
        const nestedForm = this.formBuilder.group(controlsConfig, options);
        if(autoGeneratedId){
            nestedForm.patchValue({
                [formGroupIdentifier[0]]: new Date().getTime(),
            })
        }
        (<UntypedFormArray>this.formGroup.controls[formArrayName]).push(nestedForm)
        this.compareFormArray(formArrayName, formGroupIdentifier);
    }
    insertNestedForm(
        formArrayName: string,
        formGroupIdentifier: string[],
        autoGeneratedId: boolean,
        controlsConfig: { [key:string]: any },
        index: number,
        options?: AbstractControlOptions | null
    ){
        const nestedForm = this.formBuilder.group(controlsConfig, options);
        const formArray = <UntypedFormArray>this.formGroup.controls[formArrayName];
        if(autoGeneratedId){
            nestedForm.patchValue({
                [formGroupIdentifier[0]]: new Date().getTime(),
            })
        }
        formArray.insert(index, nestedForm)
        this.compareFormArray(formArrayName, formGroupIdentifier);
    }
    editNestedForm(
          formArrayName: string,
          formGroupIdentifier: string[],
          index: number,
          formValue: any
    ): void {
        this.formGroup.get([formArrayName, index])?.patchValue(formValue);
        this.compareFormArray(formArrayName, formGroupIdentifier);
    }

    deletedNestedForm(
        formArrayName: string,
        formGroupIdentifier: string[],
        index: number
        ){
            (<UntypedFormArray>this.formGroup.get(formArrayName)).removeAt(index);
            this.compareFormArray(formArrayName, formGroupIdentifier);
    }

    protected compareFormArray(formArrayName: string, formGroupIdentifier: string[]){
        let sourceFormArray = this.originalValue[formArrayName];
        let targetFormArray =  this.formGroup.controls[formArrayName].value;

        const _indexOf = this.fieldChanges.indexOf(formArrayName);

        if(sourceFormArray.length != targetFormArray.length){
            if(_indexOf == -1) this.fieldChanges.push(formArrayName);
        } else {
            if(!sourceFormArray.length){
                if(_indexOf != -1) this.fieldChanges.splice(_indexOf, 1);
            } else {
                let matchedFormArray: any[] = arrayUtils.match(formGroupIdentifier, sourceFormArray, targetFormArray);
                let diffCount = 0;
                matchedFormArray.forEach(({ source, target }: any) => {
                    for(let formControlName in source){
                        const isEqual =
                        source && target 
                        ? this.compareValueChange(source[formControlName], target[formControlName])
                        : false;
                        if(!isEqual) {
                            diffCount++;
                            break;
                        }
                    }
                });
                if(diffCount){
                    if(_indexOf == -1) this.fieldChanges.push(formArrayName);
                }else{
                    if(_indexOf != -1) this.fieldChanges.splice(_indexOf, 1);
                }
            }
        }


    }



}