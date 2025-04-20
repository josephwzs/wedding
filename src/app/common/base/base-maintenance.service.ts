import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { EnquiryReqPayload } from "../constant/EnquiryReqPayload";
import { AbstractMaintenanceService } from "./abstract-maintenance.service";
import { AbstractSearch } from "./abstract-search.service";

export abstract class BaseMaintenanceService<FilterDataType, DomainType> implements AbstractMaintenanceService<DomainType>, AbstractSearch<FilterDataType>{
    protected httpClient: HttpClient;

    constructor(httpClient: HttpClient){
        this.httpClient = httpClient;
    }

    abstract url: string;
    cacheData: any;

    update(data: DomainType) {
        return this.httpClient.put(this.url, data);
    }
    save(data: DomainType) {
        return this.httpClient.post(this.url, data);
    }
    delete(data: any) {
        return this.httpClient.post(`${this.url}/delete`, data);
    }
    approve(data: any): Observable<any> {
        return this.httpClient.post(`${this.url}/approve`, data);
    }
    reject(data: any): Observable<any> {
        return this.httpClient.post(`${this.url}/reject`, data);
    }
    view(data: any){ //, _uniqueValue: any
        const { id, basePosition} = data;
        // const viewParams = {
        //     uniqueValue: _uniqueValue
        // }
        const _basePosition: string = basePosition || 'ACTIVE'
        return this.httpClient.get(`${this.url}/view/${id}/${_basePosition}`, { responseType: "json"}    //, params: viewParams
        )
    }
    getData(data: any): any{
        return data;
    }
    abstract getDetails(data: any): Observable<any>;
    
    abstract getIdString(data: any): string;

    abstract getId(data: any): any;

    search(data: EnquiryReqPayload<any>) {
        return this.httpClient.post(`${this.url}/search`, data);
    }
    queryData(data: EnquiryReqPayload<any>) {
        return this.httpClient.post(`${this.url}/query-data`, data);
    }
    getReference(): Observable<any> {
        return this.httpClient.get(`${this.url}/references`);
    }
    abstract getComparisonDetails(data: any): Observable<any>;

    abstract transformForComparison(data: any): Observable<any>;

    checkDuplicate(data: any) {
        return this.httpClient.get(`${this.url}/exists`, data);
    }
    searchReference(data: EnquiryReqPayload<any>) {
        return this.httpClient.post(`${this.url}/references/search`, data);
    }

}