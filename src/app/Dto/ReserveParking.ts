export class ReserveParking{
    user_id:number;
    slot:number;
    area:string;
    location:string;
    fromdatetime:string;
    todatetime:string;
    paymentId:string;
    cost:number;
    status:string;

    constructor(user_id:number,slot:number,area:string,location:string,fromdatetime:string,todatetime:string,paymentId:string,cost:number,status:string)
    {
        this.user_id=user_id;
        this.slot=slot;
        this.area=area;
        this.location=location;
        this.fromdatetime=fromdatetime;
        this.todatetime=todatetime;
        this.paymentId=paymentId;
        this.cost=cost;
        this.status=status;
    }
}