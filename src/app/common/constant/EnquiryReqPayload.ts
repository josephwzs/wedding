export class EnquiryReqPayload<T>{
    rowsPerPage!: number;
    pageNo!: number;
    filter!: T | number;
    sortBy!: string;
    sortDirection!: string;
}