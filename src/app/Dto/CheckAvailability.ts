export class CheckAvailability {
  fromdatetime: string;
  todatetime:string;
  parking_id:number;
  
  constructor(fromdatetime:string,todatetime:string,parking_id:number)
  {
    this.fromdatetime=fromdatetime;
    this.todatetime=todatetime;
    this.parking_id=parking_id;
  }
}
