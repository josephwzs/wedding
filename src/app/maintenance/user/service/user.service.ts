import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseMaintenanceService } from 'src/app/common/base/base-maintenance.service';
import { StringService } from 'src/app/common/base/string.service';
import { CommonConfiguration } from 'src/app/common/constant/common-config';
import { User } from 'src/app/common/sign-up/model/User';

@Injectable({
  providedIn: 'root'
})
export class UserService extends BaseMaintenanceService<any, User> {
  url: string = `${CommonConfiguration.API_URL}users`;
  getDetails(data: any): Observable<any> {
    return this.view(data); //, null
  }
  getIdString(data: any): string {
    return (<User>data).userId
  }
  getId(data: any) {
    return (<User>data).id
  }
  getComparisonDetails(data: any): Observable<any> {
    throw new Error('Method not implemented.');
  }
  transformForComparison(data: any): Observable<any> {
    throw new Error('Method not implemented.');
  }

  constructor(
    httpClient: HttpClient,
    private stringService: StringService,
  ) {
    super(httpClient);
  }
}
