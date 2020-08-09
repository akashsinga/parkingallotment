import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ReserveParking } from '../Dto/ReserveParking';
import { CheckAvailability } from '../Dto/CheckAvailability';
import { StorageService } from './storage-service.service';
@Injectable({
  providedIn: 'root'
})
export class UserService {

  private url="http://localhost:8080/user";
  constructor(private httpclient:HttpClient,private storage:StorageService) { }
  
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

  getLocations():Observable<any>
  {
    return this.httpclient.get(this.url+"/dashboard/getLocations",this.getHeaders());
  }
  
  reserveParking(reservation:ReserveParking):Observable<any>
  {
    return this.httpclient.post(this.url+"/reserve",reservation,this.getHeaders());
  }

  getPreviousBookings():Observable<any>
  {
    let user=this.storage.getUser();
    return this.httpclient.get(this.url+"/bookings/"+user['id'],this.getHeaders());  
  }

  isAvailable(check:CheckAvailability):Observable<any>
  {
    return this.httpclient.post(this.url+"/parkings/lots/available",check,this.getHeaders());
  }

  cancelBooking(id:number):Observable<any>
  {
    return this.httpclient.get(this.url+"/bookings/cancel/"+id,this.getHeaders());
  }
}
