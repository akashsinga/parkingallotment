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
  checkUserType() {
    if (this.isLoggedIn()) {
      let user = JSON.parse(localStorage.getItem('user'));
      console.log(user['type']);
      if (user['type'] === 'user') {
        this.router.navigate(['/user/dashboard']);
      }
    }
  }
  isLoggedIn(): boolean {
    if (localStorage.getItem('user') === null) {
      this.router.navigate(['']);
    }
    return true;
  }
}
