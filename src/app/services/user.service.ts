import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ReserveParking } from '../Dto/ReserveParking';
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
}
