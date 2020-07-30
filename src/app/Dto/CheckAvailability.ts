import { ThrowStmt } from '@angular/compiler';

export class CheckAvailability {
  fromdatetime: string;
  parking_id: number;

  constructor(fromdatetime:string,parking_id:number)
  {
    this.fromdatetime=fromdatetime;
    this.parking_id=parking_id;
  }

}
