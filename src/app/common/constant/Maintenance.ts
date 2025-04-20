
import { Action } from "./Action";
import { Status } from "./Status";

export abstract class Maintenance {
    public modifiedDate: Date | undefined;
    public modifiedBy: string | undefined;
    public approveDate: Date | undefined;
    public approvedBy: string | undefined;
    public createdDate: Date | undefined;
    public createdBy: string | undefined;
    public effectiveDate: Date | undefined;
    public status: Status | undefined;
    public action: Action| undefined;

constructor(
    modifiedDate: Date,
    modifiedBy: string,
    approveDate: Date,
    approvedBy: string,
    createdDate: Date,
    createdBy: string,
    effectiveDate: Date,
    status: Status,
    action: Action,
    ){
    this.modifiedDate = modifiedDate;
    this.modifiedBy = modifiedBy;
    this.approveDate = approveDate;
    this.approvedBy = approvedBy;
    this.createdDate = createdDate;
    this.createdBy = createdBy;
    this.effectiveDate = effectiveDate;
    this.status = status;
    this.action = action;
}

static getMaintenanceObject(): Maintenance {
    return{
        modifiedDate: null as any,
        modifiedBy: '',
        approveDate: null as any,
        approvedBy: '',
        createdDate: new Date(),
        createdBy: '',
        effectiveDate: null as any,
        status: Status.DRAFT,
        action: Action.ADD,
    }
} 
}