import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AuthService } from '../../services/auth-service.service';
import { LoginRequest } from '../../Dto/LoginRequest';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  errmsg: string;
  loginForm: FormGroup;
  loginRequest: LoginRequest;

  constructor(private formBuilder: FormBuilder, private authService: AuthService, private router: Router) {
    this.loginForm = this.formBuilder.group({
      username: '',
      password: ''
    });
    this.loginRequest = {
      username: '',
      password: ''
    }
  }

  ngOnInit(): void {
  }

  onSubmit() {
    this.loginRequest.username = this.loginForm.get('username').value;
    this.loginRequest.password = this.loginForm.get('password').value;
    this.authService.loginUser(this.loginRequest).subscribe(data => {
      console.log(data);
      if (data.hasOwnProperty('id')) {
        console.log("Login Successful");
        localStorage.setItem("user", JSON.stringify(data));
        if (data['type'] === "user") {
          this.router.navigate(['user/dashboard']);
        }
        else if (data['type'] === "admin") {
          this.router.navigate(['admin/dashboard']);
        }
      }
      else {
        this.errmsg = data['response'];
      }
    },
      error => {
        console.log(error);
        console.log("Login Failed");
      });
  }
}
