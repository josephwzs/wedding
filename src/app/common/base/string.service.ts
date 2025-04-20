import { Injectable } from "@angular/core";

@Injectable({
    providedIn:"root",
})
export class StringService {
    [x: string]: any;
    



    set stringMap(data: any){
        for (var key in data){
            this[key] = data[key];
        }
    }
}