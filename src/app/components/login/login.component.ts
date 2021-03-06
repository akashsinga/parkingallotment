import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth-service.service';
import { LoginRequest } from '../../Dto/LoginRequest';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { login } from 'src/app/shared/validationMessages';
import { loginFormErrors } from 'src/app/shared/formErrors';
import { StorageService } from 'src/app/services/storage-service.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  errmsg: string;
  loginForm: FormGroup;
  loginRequest: LoginRequest;
  formErrors=loginFormErrors;

  constructor(private formBuilder: FormBuilder,private authService: AuthService,private router: Router,private toaster: ToastrService,private storage:StorageService)
  {
    if(this.authService.isLoggedIn())
    {
      if(this.storage.getUser()['type']==="admin")
      {
        this.router.navigate(['user']);
      }
      else
      {
        this.router.navigate(['admin']);
      }
    }
    this.createForm();
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
    $('#overlay').show();
    this.loginRequest=new LoginRequest(this.loginForm.get('username').value,this.loginForm.get('password').value);
    this.authService.loginUser(this.loginRequest).subscribe((data) => {
        if(data.hasOwnProperty('id')) 
        {
          this.toaster.success('Login Successful');
          this.storage.storeUser(data);
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
        $('#overlay').hide();
      },
      (error) => 
      {
        $('#overlay').hide();
        console.log(error);
        this.toaster.error("Please Try After Some Time");
      }
    );
  }

  onValueChanged(data?: any) {
    if (!this.loginForm) {
      return;
    }
    const form = this.loginForm;
    for (const field in loginFormErrors) {
      if (loginFormErrors.hasOwnProperty(field)) {
        loginFormErrors[field] = '';
        const control = form.get(field);
        if (control && control.dirty && !control.valid) {
          const messages = login[field];
          for (const key in control.errors) {
            if (control.errors.hasOwnProperty(key)) {
              loginFormErrors[field] += messages[key] + ' ';
            }
          }
        }
      }
    }
  }
}
