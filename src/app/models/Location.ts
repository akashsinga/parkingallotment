export class ParkingLot{
    name:string;
    latitude:string;
    longitude:string;
    price_per_hour:number;
    constructor(name:string,latitude:string,longitude:string,price:any)
    {
        this.name=name;
        this.latitude=latitude;
        this.longitude=longitude;
        this.price_per_hour=price;
    }
}