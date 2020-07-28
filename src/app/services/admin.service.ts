import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ParkingLocation } from '../models/Location';
import { Area } from '../models/Area';

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

  getParkingAreas():Observable<any>
  {
    return this.httpclient.get(this.url+"/areas/get");
  }

  getAreas():Observable<any>
  {
    return this.httpclient.get(this.url+"/parkings/areas/get");
  }

  getLocations():Observable<any>
  {
    return this.httpclient.get(this.url+"/parkings/locations/get");
  }

  addParkingArea(area:Area):Observable<any>
  {
    return this.httpclient.post(this.url+"/parkings/areas/add",area);
  }

  addParkingLocation(location:ParkingLocation):Observable<any>
  {
    return this.httpclient.post(this.url+"/parkings/add",location);
  }
  
  editParkingLocation(location:ParkingLocation,id:number):Observable<any>
  {
    return this.httpclient.post(this.url+"/parkings/edit/"+id,location);
  }

  editParkingArea(area:Area,id:number):Observable<any>
  {
    return this.httpclient.post(this.url+"/parkings/areas/edit/"+id,area);
  }

  deleteParkingLot(id:number):Observable<any>
  {
    return this.httpclient.get(this.url+"/parkings/delete/"+id);
  }
}
