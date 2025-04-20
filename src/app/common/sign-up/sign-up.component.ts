import { Component, OnInit, ViewChild } from '@angular/core';
import { UntypedFormArray, UntypedFormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { Form } from '../base/form';
import { StringService } from '../base/string.service';
import { CardComponent } from './card/card.component';
import { User } from './model/User';
import { SignUpService } from './service/sign-up.service';
import { NgFor } from '@angular/common';
import { FormFieldInputComponent } from '../shared/form-field-input/form-field-input.component';
import { BaseFormComponent } from '../shared/base-form/base-form.component';

@Component({
    selector: 'app-sign-up',
    templateUrl: './sign-up.component.html',
    styleUrls: ['./sign-up.component.css'],
    standalone: true,
    imports: [BaseFormComponent, ReactiveFormsModule, FormFieldInputComponent, NgFor, CardComponent]
})
export class SignUpComponent extends Form<User> implements OnInit {
  @ViewChild(CardComponent, { static: false}) creditCardModal!: CardComponent;

  constructor(
    formBuilder: UntypedFormBuilder,
    stringService: StringService,
    public signUpService: SignUpService,
  ) {
    super(formBuilder, stringService);
    this.screenLabels = stringService;
    this.model = User.createEmptyModel();


    this.createFormGroup({
      userId: [this.model.userId, [Validators.maxLength(20), Validators.minLength(3)]],
      name: [this.model.name, [Validators.maxLength(20), Validators.minLength(1)]],
      email: [this.model.email, [Validators.maxLength(50), Validators.minLength(1)]],
      phoneNo: [this.model.phoneNo, [Validators.maxLength(20), Validators.minLength(8)]],
      password: [this.model.password, [Validators.maxLength(30), Validators.minLength(3)]],
      userType: [this.model.userType],
      userStatus: [this.model.userStatus],
      card: new UntypedFormArray([]),
    })
  }


  ngOnInit(): void {
  }
  override setFormValue(data: any, original?: boolean): void {
      const parseVal = data.card ? JSON.parse(data.card) : null;
      super.setFormValue({
        ...data,
        userId: data.userId,
        name: data.name,
        email: data.email,
        phoneNo: data.phoneNo,
        password: data.password,
        userType: data.userType,
        userStatus: data.userStatus,
        card: parseVal?.forEach((item:any)=>{
          super.addedNestedFrom("card", ["card"], false,{
            bankName: data.bankName,
            cardNumber: data.cardNumber,
            cardExpiry: data.cardExpiry,
            cardCcv: data.cardCcv,
          });
        }),
      }),
      original
  }
  override getFormValue(): User {
    const formValue = this.formGroup.getRawValue();
    const form = {
      ...formValue,
      userId: formValue.userId,
      name: formValue.name,
      email: formValue.email,
      phoneNo: formValue.phoneNo,
      password: formValue.password,
      userType: formValue.userType != ""? formValue.userType : "NORMAL",
      userStatus: formValue.userStatus != ""? formValue.userStatus : "ACTIVE",
      card: JSON.stringify(formValue.card.map((obj: any) => {
        return{
          ...obj,
          bankName: obj.bankName,
          cardNumber: obj.cardNumber,
          cardExpiry: obj.cardExpiry,
          cardCcv: obj.cardCcv,
        }
      }))
    }
    return form;

  }
  addCreditCard(){
    this.creditCardModal.openModal();
  }
  addCreditCardBase(data: any){
    super.addedNestedFrom("card", ["card"], false,{
      bankName: data.bankName,
      cardNumber: data.cardNumber,
      cardExpiry: data.cardExpiry,
      cardCcv: data.cardCcv,
    })
  }
  get card(){
    return this.formGroup.get("card") as UntypedFormArray;
  }
  deleteCreditCardBase(rowIndex:number){
    // this.selectedIndex = rowIndex;
    this.deletedNestedForm("card", ["card"], rowIndex)
    this.card.controls.splice(rowIndex,0)
  }

}
