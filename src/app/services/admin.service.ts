import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AddArea } from '../Dto/AddArea';
import { location } from '../models/Location';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  private url = 'http://localhost:8080/admin';
  constructor(private httpclient:HttpClient) {}

  getUserCount():Observable<any>
  {
    return this.httpclient.get(this.url+"/dashboard/getUserCount");
  }

  getParkingsCount():Observable<any>
  {
    return this.httpclient.get(this.url+"/dashboard/getParkingCount");
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

  addParkingArea(area:AddArea):Observable<any>
  {
    return this.httpclient.post(this.url+"/parkings/areas/add",area);
  }

  addParkingLocation(location:location):Observable<any>
  {
    return this.httpclient.post(this.url+"/parkings/add",location);
  }
}
