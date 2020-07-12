import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

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
    return this.httpclient.get(this.url+"/parkings/get");
  }
}
