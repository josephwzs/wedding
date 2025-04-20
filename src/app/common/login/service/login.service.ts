import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CommonConfiguration } from '../../constant/common-config';
@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(
  private httpClient: HttpClient
  ) { }

  logIn(data: any): Observable<any>{
    const url = `${CommonConfiguration.API_URL}login`;
    return this.httpClient.post(url, data);
  }
}
