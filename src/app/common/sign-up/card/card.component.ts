import { Component, EventEmitter, Input, OnInit, Output, TemplateRef, ViewChild } from '@angular/core';
import { UntypedFormBuilder, ReactiveFormsModule } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Form } from '../../base/form';
import { StringService } from '../../base/string.service';
import { Card } from '../model/card';
import { FA_ICONS } from './fontawesome-const';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgIf } from '@angular/common';
declare let Cleave: any;
@Component({
    selector: 'app-card',
    templateUrl: './card.component.html',
    styleUrls: ['./card.component.css'],
    standalone: true,
    imports: [ReactiveFormsModule, NgIf, FontAwesomeModule]
})
export class CardComponent extends Form<Card> implements OnInit {
  faIcons = FA_ICONS;
  faIcon: any;
  modelReference: any;
  @ViewChild(TemplateRef) modalTemplate: any;
  @Output() add: EventEmitter<any> = new EventEmitter<any>();

  constructor(
    private modalService: NgbModal,
    stringService: StringService,
    formBuilder: UntypedFormBuilder,
    ) {
    super(formBuilder, stringService);
    this.screenLabels = stringService;


    super.createFormGroup({
      bankName: [""],
      cardNumber: [""],
      cardExpiry: [""],
      cardCcv: [""],
    })
   }
  openModal(){
    this.modelReference = this.modalService.open(this.modalTemplate, {size: "lg", centered: true});
    new Cleave("#cardNumber1", {
      creditCard: true,
      delimiter: "-",
      onCreditCardTypeChanged: (type: any) => {
        switch (type) {
          case "visa":
            this.faIcon = this.faIcons.faCcVisa
            break;
          case "mastercard":
            this.faIcon = this.faIcons.faCcMastercard
            break;
          case "amex":
            this.faIcon = this.faIcons.faCcAmex
            break;
          case "diners":
            this.faIcon = this.faIcons.faCcDinersClub
            break;
          case "jcb":
            this.faIcon = this.faIcons.faCcJcb
            break;
          case "discover":
            this.faIcon = this.faIcons.faCcDiscover
            break;
          default:
            this.faIcon = null
            break;
          }
        },
      });
      new Cleave("#cardExpiry1", {
        date: true,
        dateMin: '21-09',
        datePattern: ["m", "y"],
      });
      
      new Cleave("#cardCcv1", {
        blocks: [3],
      });
  }
  addCreditCard(event: any){
    this.add.emit(this.formGroup.getRawValue());
    this.modelReference.close();
    this.resetFormValue()
  }
  isAddEnabled():boolean{
    return(
      this.isFormValid()
    )
  }
  ngOnInit(): void {
    // new Cleave("#cardNumber1", {
    //   creditCard: true,
    //   delimiter: "-",
    //   onCreditCardTypeChanged: (type: any) => {
    //     switch (type) {
    //       case "visa":
    //         this.faIcon = this.faIcons.faCcVisa
    //         break;
    //       case "mastercard":
    //         this.faIcon = this.faIcons.faCcMastercard
    //         break;
    //       case "amex":
    //         this.faIcon = this.faIcons.faCcAmex
    //         break;
    //       case "diners":
    //         this.faIcon = this.faIcons.faCcDinersClub
    //         break;
    //       case "jcb":
    //         this.faIcon = this.faIcons.faCcJcb
    //         break;
    //       case "discover":
    //         this.faIcon = this.faIcons.faCcDiscover
    //         break;
    //       default:
    //         this.faIcon = null
    //         break;
    //       }
    //     },
    //   });
    //   new Cleave("#cardExpiry1", {
    //     date: true,
    //     dateMin: '21-09',
    //     datePattern: ["m", "y"],
    //   });
      
    //   new Cleave("#cardCcv1", {
    //     blocks: [3],
    //   });
  }
  
}


