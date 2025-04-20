import { AbstractControlOptions } from "@angular/forms";

export interface RootForm<DomainDataType>{
createFormGroup(controlsConfig: {[key:string]: any}, options?: AbstractControlOptions| null | undefined): void;

getFormValue(): DomainDataType;
setFormValue(formValue: DomainDataType, isOriginal?: boolean): void;
resetFormValue(): void;
clearFormValue(): void;
isFormChanges(): boolean;
getOriginalFormValue(): any;
isFormValid(): boolean;
isFormDirty(): boolean;
clearFieldValue(formControlName: string): void;
setFieldValue(formControlName: string, fieldValue: any): void;
hasError(formControlName: string): boolean;
getErrorMessage(formControlName: string, customError?: any): string;




}