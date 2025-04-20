import { mainModule } from "process";
import { Action } from "../../constant/Action";
import { Maintenance } from "../../constant/Maintenance";
import { Status } from "../../constant/Status";
import { Card } from "./card";

export class User extends Maintenance {

    id: string;
    userId: string;
    name: string;
    email?: string;
    phoneNo?: string;
    password?: string;
    userType?: string;
    userStatus?: string;
    loginAttemps?: number;
    card: Card[];


    constructor(
        id: string,
        userId: string,
        name: string,
        email: string,
        phoneNo: string,
        password: string,
        userType: string,
        userStatus: string,
        loginAttemps: number,
        card: Card[],
    ){
        super(
            null as any,
            '',
            null as any,
            '',
            new Date(),
            '',
            null as any,
            Status.DRAFT,
            Action.ADD,

        )
        this.id = id
        this.userId = userId
        this.name = name
        this.email = email
        this.phoneNo = phoneNo
        this.password = password
        this.userType = userType
        this.userStatus = userStatus
        this.loginAttemps = loginAttemps
        this.card = card
    }
    static createEmptyModel(): User {
        return {
            id: null as any,
            userId: '',
            name: '',
            email: '',
            phoneNo: '',
            password: '',
            userType: '',
            userStatus: '',
            loginAttemps: 0,
            card: [],
            ...Maintenance.getMaintenanceObject(),
        }
    }

}