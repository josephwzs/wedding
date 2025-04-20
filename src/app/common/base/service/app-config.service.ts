import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { zip } from 'rxjs';
import { StringService } from '../string.service';

@Injectable({
  providedIn: 'root'
})
export class AppConfigService {

  loggedInUser: any;

  constructor(
    private httpClient: HttpClient,
    private router: Router,
    private stringService: StringService,
  ) { }

  loadConfigurations(){
    return new Promise((resolve, reject) => {
      zip(
        this.httpClient.get(`/assets/strings.json`)
      ).subscribe({
        next: ([
          strings
        ]: any[]) => {
          this.stringService.stringMap = {
            ...strings,
          }
          resolve(true)
        },
        error: (err: any) =>{
        resolve(true)}
      })
    }
    )
  }
  loadLoggedInUserInfo(data: any){
    return this.loadPostLogInData(data);
  }
  loadPostLogInData(user: any): void {
    const _user = user

    this.loggedInUser = {
      ..._user
    }
  }
  getLoggedInUser(){
    return this.loggedInUser
  }
}
