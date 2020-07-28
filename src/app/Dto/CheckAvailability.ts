import { ThrowStmt } from '@angular/compiler';

export class CheckAvailability {
  fromdatetime: string;
  slot: number;
  area: string;
  location: string;
  
  constructor(fromdatetime:string,slot:number,area:string,location:string)
  {
    this.fromdatetime=fromdatetime;
    this.slot=slot;
    this.area=area;
    this.location=location;
  }

}
