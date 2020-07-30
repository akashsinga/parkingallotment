export class ReserveParking{
    user_id:number;
    parking_id:number;
    fromdatetime:string;
    todatetime:string;
    paymentId:string;
    cost:number;
    status:string;

    constructor(user_id:number,parking_id:number,fromdatetime:string,todatetime:string,paymentId:string,cost:number,status:string)
    {
        this.user_id=user_id;
        this.parking_id=parking_id;
        this.fromdatetime=fromdatetime;
        this.todatetime=todatetime;
        this.paymentId=paymentId;
        this.cost=cost;
        this.status=status;
    }
}