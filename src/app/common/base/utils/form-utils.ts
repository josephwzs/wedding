import { UntypedFormGroup } from "@angular/forms";
import { StringService } from "../string.service";

export const getErrorMessage = (form: UntypedFormGroup, formControlName: string, stringService: StringService, customError?: any): string => {
    const { errors } = form.controls[formControlName];

    if (errors) {
        let control = form.controls[formControlName];
    
        if(customError){
            if(customError && customError[Object.keys(errors)[0]]){
                return customError[Object.keys(errors)[0]];
            }
        }
        if(control.hasError("required")){
            return stringService["msg_err_required"];
        }else if(control.hasError("minlength")){
            return formatErrorMessage(stringService["msg_err_minlength_specific"],errors["minlength"].requiredLength);
        }else if(control.hasError("maxlength")){
            return formatErrorMessage(stringService["msg_err_maxlength_specific"],errors["maxlength"].requiredLength);
        }else return `Error in ${formControlName} field`;
    }
    else return "";

}
const formatErrorMessage = (errorMessage: string, replaceVal: any): string => errorMessage.replace("{0}",replaceVal);