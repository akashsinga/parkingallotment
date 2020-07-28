import { Area } from './Area';
export class ParkingLocation{
    slot:number;
    area:Area;
    price_per_hour:number;
    constructor(slot:any,area:Area,price:any)
    {
        this.slot=slot;
        this.area=area;
        this.price_per_hour=price;
    }
}