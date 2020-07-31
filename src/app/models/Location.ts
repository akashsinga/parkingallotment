import { Owner } from './Owner';
export class ParkingLot{
    name:string;
    latitude:string;
    longitude:string;
    price_per_hour:number;
    owner:Owner;
    constructor(name:string,latitude:string,longitude:string,price:any,owner:Owner)
    {
        this.name=name;
        this.latitude=latitude;
        this.longitude=longitude;
        this.price_per_hour=price;
        this.owner=owner;
    }
}