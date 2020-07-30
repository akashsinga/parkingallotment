import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ReserveParking } from '../Dto/ReserveParking';
import { CheckAvailability } from '../Dto/CheckAvailability';
@Injectable({
  providedIn: 'root'
})
export class UserService {

  private url="http://localhost:8080/user/";
  constructor(private httpclient:HttpClient) { }

  getLocations():Observable<any>
  {
    return this.httpclient.get(this.url+"dashboard/getLocations");
  }
  
  reserveParking(reservation:ReserveParking):Observable<any>
  {
    return this.httpclient.post(this.url+"reserve",reservation);
  }

  getPreviousBookings():Observable<any>
  {
    let user=JSON.parse(localStorage.getItem("user"));
    return this.httpclient.get(this.url+"bookings/"+user['id']);  
  }

  isAvailable(check:CheckAvailability):Observable<any>
  {
    return this.httpclient.post(this.url+"parkings/lots/available",check);
  }
}
