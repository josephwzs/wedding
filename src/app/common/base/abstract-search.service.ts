import { EnquiryReqPayload } from "../constant/EnquiryReqPayload";

export interface AbstractSearch<FilterDataType> {
    search(enquiryRequest: EnquiryReqPayload<FilterDataType>): any;
    queryData(enquiryRequest: EnquiryReqPayload<FilterDataType>): any;

}