import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';
import { ParkingLot } from '../models/Location';
import { GetReports } from '../Dto/GetReports';
import { StorageService } from './storage-service.service';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  private url = 'http://localhost:8080/admin';
  constructor(private httpclient:HttpClient,private storage:StorageService) {}

  getHeaders()
  {
    const options={
      headers:new HttpHeaders({
        'Content-Type':'application/json',
        'request_id':String(this.storage.getUser()['id'])
      })
    };
    return options;
  }

  getDashboardCounts():Observable<any>
  {
    return this.httpclient.get(this.url+"/dashboard/getCounts",this.getHeaders());
  }

  getParkingLocations():Observable<any>
  {
    return this.httpclient.get(this.url+"/locations/get",this.getHeaders());
  }

  addParkingLocation(location:ParkingLot):Observable<any>
  {
    return this.httpclient.post(this.url+"/parkings/add",location,this.getHeaders());
  }
  
  editParkingLocation(location:ParkingLot,id:number):Observable<any>
  {
    return this.httpclient.post(this.url+"/parkings/edit/"+id,location,this.getHeaders());
  }

  deleteParkingLot(id:number):Observable<any>
  {
    return this.httpclient.get(this.url+"/parkings/delete/"+id,this.getHeaders());
  }

  getUsers():Observable<any>
  {
    return this.httpclient.get(this.url+"/users",this.getHeaders());
  }
  
  editUser(id:number,role:string):Observable<any>
  {
    return this.httpclient.post(this.url+"/users/edit/"+id,role,this.getHeaders());
  }

  getReports(reports:GetReports):Observable<any>
  {
    return this.httpclient.post(this.url+"/reports",reports,this.getHeaders());
  }

  cancelBooking(id:any):Observable<any>
  {
    return this.httpclient.get(this.url+"/bookings/cancel/"+id,this.getHeaders());
  }
}
