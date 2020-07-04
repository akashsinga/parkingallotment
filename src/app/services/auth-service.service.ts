import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RegisterRequest } from '../Dto/RegisterRequest';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private url='http://localhost:8080/';
  constructor(private httpClient: HttpClient) { }

  registerUser(registerRequest:RegisterRequest):Observable<any>
  {
      return this.httpClient.post(this.url + "register", registerRequest);
  }
}
