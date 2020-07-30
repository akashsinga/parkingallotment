import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ParkingLot } from '../models/Location';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  private url = 'http://localhost:8080/admin';
  constructor(private httpclient:HttpClient) {}

  getDashboardCounts():Observable<any>
  {
    return this.httpclient.get(this.url+"/dashboard/getCounts");
  }

  getParkingLocations():Observable<any>
  {
    return this.httpclient.get(this.url+"/locations/get");
  }

  addParkingLocation(location:ParkingLot):Observable<any>
  {
    return this.httpclient.post(this.url+"/parkings/add",location);
  }
  
  editParkingLocation(location:ParkingLot,id:number):Observable<any>
  {
    return this.httpclient.post(this.url+"/parkings/edit/"+id,location);
  }

  deleteParkingLot(id:number):Observable<any>
  {
    return this.httpclient.get(this.url+"/parkings/delete/"+id);
  }
}
