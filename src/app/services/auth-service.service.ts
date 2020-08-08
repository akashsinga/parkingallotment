import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RegisterRequest } from '../Dto/RegisterRequest';
import { Observable } from 'rxjs';
import { LoginRequest } from '../Dto/LoginRequest';
import { Router } from '@angular/router';
import { VerifyCode } from '../Dto/VerifyCode';
import { ResetPassword } from '../Dto/ResetPassword';
import { StorageService } from './storage-service.service';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private url = 'http://localhost:8080/';
  constructor(private httpClient: HttpClient, private router: Router,private storage:StorageService) {}

  registerUser(registerRequest: RegisterRequest): Observable<any> {
    return this.httpClient.post(this.url + 'register', registerRequest);
  }

  loginUser(loginRequest: LoginRequest): Observable<any> {
    return this.httpClient.post(this.url + 'login', loginRequest);
  }

  logoutUser() {
    $('#overlay').show();
    console.log('cleared');
    sessionStorage.clear();
    setTimeout(()=>{
      $('#overlay').hide();
      this.router.navigate(['']);
    },2000)
  }

  isUser():boolean
  {
    if(this.isLoggedIn())
    {
      let user = this.storage.getUser();
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
      let user = this.storage.getUser();
      if(user['type']==='admin')
      {
        return true;
      }
    }
    return false;
  }

  isLoggedIn(): boolean {
    if (sessionStorage.getItem('user') === null) {
      return false;
    }
    return true;
  }

  checkUserExists(username:string):Observable<any>
  {
    console.log(this.url+"register/checkuser/"+username);
    return this.httpClient.post(this.url+"register/checkuser",username);
  }

  sendVerificationCode(email:string):Observable<any>
  {
    return this.httpClient.post(this.url+"forgotpassword",email);
  }

  checkEmailExists(email:string):Observable<any>
  {
    return this.httpClient.post(this.url+"register/checkemail",email);
  }

  verifyCode(verify:VerifyCode):Observable<any>
  {
    return this.httpClient.post(this.url+"forgotpassword/verify",verify);
  }
  
  resetPassword(reset:ResetPassword):Observable<any>
  {
    return this.httpClient.post(this.url+"forgotpassword/reset",reset);
  }
}
