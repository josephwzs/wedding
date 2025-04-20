import { HttpParams } from '@angular/common/http';
import { HtmlParser } from '@angular/compiler';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { RootScreen } from '../base/root-screen';
import { AppConfigService } from '../base/service/app-config.service';
import { StringService } from '../base/string.service';
import { LoginService } from './service/login.service';
import { NgIf } from '@angular/common';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css'],
    standalone: true,
    imports: [ReactiveFormsModule, NgIf]
})
export class LoginComponent extends RootScreen implements OnInit, OnDestroy {

  loginForm: UntypedFormGroup;
  inlineError: String = "";
  override screenLabels: StringService;
  constructor(
    formBuilder: UntypedFormBuilder,
    private loginService: LoginService,
    private router: Router,
    private stringService: StringService,
    private appConfigService: AppConfigService,
    ) 
  {
    super();
    this.screenLabels = stringService;
    this.loginForm = formBuilder.group({
      userId: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
      passWord:['',[Validators.required, Validators.minLength(3), Validators.maxLength(20)] ]
    })
  }

  ngOnInit(): void {
    document.querySelector("body")?.classList.add("no-layout");
  }

  ngOnDestroy(): void {
    document.querySelector("body")?.classList.remove("no-layout");
  }
  logIn(){
    this.inlineError = ""
    let credentials = new HttpParams()
    .set('userId',this.loginForm.value.userId.trim())
    .set('passWord', this.loginForm.value.passWord)
    // const credentials = {
    //   'userId': this.loginForm.value.userId.trim(),
    //   'passWord': this.loginForm.value.passWord
    // }
    this.loginService.logIn(credentials).subscribe({
      next:(data: any) => {
        this.appConfigService.loadLoggedInUserInfo(data)
        this.router.navigate(["/maintenance/dashboard"])
        
      },
      error: (data: any) =>{
        if(data?.error?._errorCode == 'INCORRECT_PASSWORD'){
          this.inlineError = this.screenLabels['lbl_badPassword']
          console.error("Error at Login", "INCORRECT_PASSWORD")
        }
        else if(data?.error?._errorCode == 'INVALID_LOGIN'){
          this.inlineError = this.screenLabels['lbl_badCredentials']
          console.error("Error at Login", "INVALID_LOGIN")
        }
        else{
          this.inlineError = this.screenLabels['lbl_badCredentials']
          console.error("Error at Login", data?.error?._errorCode)}
      }}
    )
  }

  ok(): void{
    this.loginForm.controls["userId"].setErrors(null)
    this.loginForm.controls["passWord"].setErrors(null)
    this.logIn()
  }
  change(event: any){
    this.inlineError = "";
    this.loginForm.controls["userId"].setErrors(null)
    this.loginForm.controls["passWord"].setErrors(null)
  }


}
