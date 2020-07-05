import { Component, OnInit } from '@angular/core';
import { FormBuilder,FormGroup } from '@angular/forms';
import { RegisterRequest } from '../../Dto/RegisterRequest';
import { AuthService } from '../../services/auth-service.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  registerForm:FormGroup;
  registerRequest:RegisterRequest;

  constructor(private formBuilder:FormBuilder,private authService:AuthService,private router:Router) {
    this.registerForm=this.formBuilder.group({
      fullname:'',
      username:'',
      mobile:'',
      email:'',
      password:'',
      confirmpassword:'',
      type:'user'
    });
    this.registerRequest={
      fullname:'',
      username:'',
      mobile:'',
      email:'',
      password:'',
      type:'user'
    }
   }

  ngOnInit(): void {
  }

  onSubmit()
  {
    this.registerRequest.fullname=this.registerForm.get('fullname').value;
    this.registerRequest.username=this.registerForm.get('username').value;
    this.registerRequest.mobile=this.registerForm.get('mobile').value;
    this.registerRequest.email=this.registerForm.get('email').value;
    this.registerRequest.password=this.registerForm.get('password').value;
    this.registerRequest.type='user';

    this.authService.registerUser(this.registerRequest)
    .subscribe(data =>{
      console.log(data);
      console.log("Registration Successful");
      this.router.navigate(['']);
    },
    error =>{
      console.log(error);
      console.log("Registration Failed");
    });
  }
}
