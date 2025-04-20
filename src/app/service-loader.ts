import { Injectable } from "@angular/core";
import { ServiceRegistry } from "./common/base/service-registry";

@Injectable({
    providedIn: "root",
})

export class ServiceLoader {

    constructor(
        serviceRegistry: ServiceRegistry,
    ){
        // serviceRegistry.register(),
    }
}