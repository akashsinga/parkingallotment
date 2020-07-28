import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth-service.service';
import { LoginRequest } from '../../Dto/LoginRequest';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  errmsg: string;
  loginForm: FormGroup;
  loginRequest: LoginRequest;

  formErrors = {
    username: '',
    password: '',
  };

  validationMessages = {
    username: {
      required: 'Username is required.',
    },
    password: {
      required: 'Password is required',
    },
  };

  constructor(private formBuilder: FormBuilder,private authService: AuthService,private router: Router,private toaster: ToastrService)
  {
    this.createForm();
    this.authService.isLoggedIn();
    this.loginRequest = 
    {
      username: '',
      password: '',
    };
  }

  createForm(): void 
  {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });

    this.loginForm.valueChanges.subscribe((data) => this.onValueChanged(data));
    this.onValueChanged();
  }

  ngOnInit(): void {}

  onSubmit() {
    this.loginRequest=new LoginRequest(this.loginForm.get('username').value,this.loginForm.get('password').value);
    this.authService.loginUser(this.loginRequest).subscribe((data) => {
        if(data.hasOwnProperty('id')) 
        {
          this.toaster.success('Login Successful');
          localStorage.setItem('user', JSON.stringify(data));
          if (data['type'] == 'user') 
          {
            this.router.navigate(['user/dashboard']);
          } 
          else if (data['type'] == 'admin') 
          {
            this.router.navigate(['admin/dashboard']);
          }
        } 
        else 
        {
          this.toaster.error(data['response']);
        }
      },
      (error) => 
      {
        console.log(error);
        console.log('Login Failed');
      }
    );
  }

  onValueChanged(data?: any) {
    if (!this.loginForm) {
      return;
    }
    const form = this.loginForm;
    for (const field in this.formErrors) {
      if (this.formErrors.hasOwnProperty(field)) {
        this.formErrors[field] = '';
        const control = form.get(field);
        if (control && control.dirty && !control.valid) {
          const messages = this.validationMessages[field];
          for (const key in control.errors) {
            if (control.errors.hasOwnProperty(key)) {
              this.formErrors[field] += messages[key] + ' ';
            }
          }
        }
      }
    }
  }
}
