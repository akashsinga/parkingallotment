import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RegisterRequest } from '../Dto/RegisterRequest';
import { Observable } from 'rxjs';
import { LoginRequest } from '../Dto/LoginRequest';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private url = 'http://localhost:8080/';
  constructor(private httpClient: HttpClient, private router: Router) {}

  registerUser(registerRequest: RegisterRequest): Observable<any> {
    return this.httpClient.post(this.url + 'register', registerRequest);
  }

  loginUser(loginRequest: LoginRequest): Observable<any> {
    return this.httpClient.post(this.url + 'login', loginRequest);
  }

  logoutUser() {
    console.log('cleared');
    localStorage.clear();
    this.router.navigate(['']);
  }

  isUser():boolean
  {
    if(this.isLoggedIn())
    {
      let user = JSON.parse(localStorage.getItem('user'));
      if(user['type']==='user')
      {
        return true;
      }
    }
    return false;
  }

  isAdmin():boolean
  {
    if(this.isLoggedIn())
    {
      let user = JSON.parse(localStorage.getItem('user'));
      if(user['type']==='admin')
      {
        return true;
      }
    }
    return false;
  }

  isLoggedIn(): boolean {
    if (localStorage.getItem('user') === null) {
      return false;
    }
    return true;
  }

  checkUserExists(username:string):Observable<any>
  {
    console.log(this.url+"register/checkuser/"+username);
    return this.httpClient.post(this.url+"register/checkuser",username);
  }
}
