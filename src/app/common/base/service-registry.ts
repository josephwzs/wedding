import { Injectable } from "@angular/core";
import { BaseMaintenanceService } from "./base-maintenance.service";

@Injectable({
    providedIn: "root",
})

export class ServiceRegistry {
    private serviceMap : any = {};

        registry(domainName: string, service: BaseMaintenanceService<any, any>){
            this.serviceMap[domainName] = service;
        }

        getService(domainName: string): BaseMaintenanceService<any, any>{
            return this.serviceMap[domainName];
        }
}