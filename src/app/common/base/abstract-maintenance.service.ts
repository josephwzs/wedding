import { Observable } from "rxjs";
import { EnquiryReqPayload } from "../constant/EnquiryReqPayload";

export interface AbstractMaintenanceService<T>{
    save(data: T): any;
    update(data: T): any;
    delete(data: any): any;
    getDetails(data: any): Observable<any>;
    getIdString(data: any): string;
    getId(data: any): any;
    search(data: EnquiryReqPayload<any>): any;
    queryData(data: EnquiryReqPayload<any>): any;
    getReference(): Observable<any>;
    approve(data: any): Observable<any>;
    reject(data: any): Observable<any>;
    getComparisonDetails(data: any): Observable<any>;
    transformForComparison(data: any): Observable<any>;
    checkDuplicate(data: any): any;
    searchReference(data: EnquiryReqPayload<any>): any;
}