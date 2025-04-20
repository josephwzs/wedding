import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, Subscription } from 'rxjs';
import { BaseMaintenanceService } from '../../base/base-maintenance.service';
import { Form } from '../../base/form';
import { RootScreen } from '../../base/root-screen';
import { StringService } from '../../base/string.service';
import { Location, NgIf } from '@angular/common';
import { FormBuilder } from '@angular/forms';
import { FormLayoutComponent } from '../form-layout/form-layout.component';

@Component({
    selector: 'app-base-form',
    templateUrl: './base-form.component.html',
    styleUrls: ['./base-form.component.css'],
    standalone: true,
    imports: [FormLayoutComponent, NgIf]
})
export class BaseFormComponent extends RootScreen implements OnInit, OnDestroy {
  @Input() service!: BaseMaintenanceService<any,any>;
  @Input() form!: Form<any>;
  @Input() buttonHidden: boolean = false;
  @Input() isSubmitHidden: boolean = false;
  @Input() isCancelHidden: boolean = false;


  isCancelEnabled: boolean = true;
  // isSubmitEnabled: boolean = false;
  model: any;
  mode: string = "";
  isLiveData: boolean = false;
  id: string = "";


  private formGroupSubscription: Subscription = new Subscription();
  getDetailSubject: Subject<any> = new Subject();

  constructor(
    stringService: StringService,
    protected route: ActivatedRoute,
    protected router: Router,
    private location: Location,

  ) { 
    super();
    this.screenLabels = stringService;
  }
  ngOnDestroy(): void {
    this.formGroupSubscription.unsubscribe();
  }

  ngOnInit(): void {
    this.formGroupSubscription = this.form.formGroupSubject.subscribe({
      next: () => {
          this.initForm()
      }
    })
  }
  initForm(){
    this.model = this.form.getModel();
    this.route.queryParams.subscribe((params) => {
    this.isLiveData = params['isLive'] == "true";
    // let { id } = this.route.snapshot.params;
    let id =  params['id']
    this.id = id;
      if(id){
      this.service.view({
        id,
        basePosition: this.isLiveData? 'ACTIVE' : 'DRAFT',
      }).subscribe((data)=>{ //null
        if(data == null){
          this.location.back();
        }else{
          this.getDetailSubject.next(data);
          this.model = data;
          this.form.setFormValue(data, true);
          this.form.listenValueChanges();
          this.enableFormError();
        }
      })}
      else{
        this.form.listenValueChanges();
        this.getDetailSubject.next(null)
      }
    })
  }
  enableFormError(): void{
    Object.keys(this.form.formGroup.controls).forEach(key => {
      this.form.formGroup.controls[key].markAsDirty();
    })
    this.form?.formGroup?.markAllAsTouched();
  }

  onSubmit(){
    if(this.isSubmitEnabled()){
      let targetModel = this.form.prepareCacheData({
        ...this.model,
        ...this.form.getFormValue()
      })
      if(!this.id){
      this.service.save(this.service.getData(targetModel)).subscribe({
        next:() =>{this.location.back()},
        error: () => {}
    })}else{
      this.service.update(this.service.getData(targetModel)).subscribe({
        next:() =>{this.location.back()},
        error: () => {}
    })
    }
  }
  }

  isSubmitEnabled(): boolean{
    return(
      this.form.isFormValid() && this.form.isFormChanges()
    )
  }
  onCancel(){
    if(this.isCancelEnabled){
      this.location.back(); 
    }
  }

}
