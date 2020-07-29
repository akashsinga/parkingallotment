import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import { RegisterRequest } from '../../Dto/RegisterRequest';
import { AuthService } from '../../services/auth-service.service';
import { Router } from '@angular/router';
import { uniqueUsernameValidator } from '../../shared/unique-username-validator.directive';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup;
  registerRequest: RegisterRequest;
  errMess: string;
  exist:string;

  formErrors = {
    fullname: '',
    username: '',
    mobile: '',
    email: '',
    password: '',
    confirmpassword: '',
  };
  
  validationMessages = {
    fullname: {
      required: 'Full Name is required.',
      minlength: 'Full Name must be at least 2 characters long.',
      maxlength: 'Full Name cannot be more than 25 characters long.',
    },
    username: {
      required: 'User Name is required.',
      minlength: 'User Name must be at least 2 characters long.',
      maxlength: 'User Name cannot be more than 25 characters long.',
      notunique: 'Username already exists'
    },
    mobile: {
      required: 'Mobile Number is required.',
      pattern: 'Mobile Number must contain only numbers.',
    },
    email: {
      required: 'Email is required.',
      email: 'Email not in valid format.',
    },
    password: {
      required: 'Password is required',
      minlength: 'Password must be at least 6 characters long.',
    },
    confirmpassword: {
      required: 'Confirm Password is required',
      mustMatch: 'Password and Confirm Password doesnot match',
    },
  };

  constructor(private formBuilder: FormBuilder,public authService: AuthService,private router: Router,private toaster:ToastrService) 
  {
    this.createForm();
    this.registerRequest = {
      fullname: '',
      username: '',
      mobile: '',
      email: '',
      password: '',
      type: 'user',
    };
  }

  ngOnInit(): void {}

  createForm(): void {
    this.registerForm = this.formBuilder.group(
      {
        fullname: [
          '',
          [
            Validators.required,
            Validators.minLength(2),
            Validators.maxLength(25),
          ],
        ],
        username: [
          '',
          [
            Validators.required,
            Validators.minLength(2),
            Validators.maxLength(25),
          ],
          [
            uniqueUsernameValidator(this.authService)
          ]
        ],
        mobile: ['', [Validators.required, Validators.pattern]],
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(6)]],
        confirmpassword: ['',[Validators.required, Validators.minLength(6)]],
        type: 'user',
      },
      { validator: this.checkPasswords('password', 'confirmpassword')},
    );

    this.registerForm.valueChanges.subscribe((data) =>
      this.onValueChanged(data)
    );

    this.onValueChanged();
  }

  onValueChanged(data?: any) {
    if (!this.registerForm) {
      return;
    }
    const form = this.registerForm;
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

  checkPasswords(controlName: string, matchingControlName: string) {
    return (formGroup: FormGroup) => {
      const control = formGroup.controls[controlName];
      const matchingControl = formGroup.controls[matchingControlName];
      if (matchingControl.errors && !matchingControl.errors.mustMatch) {
        return;
      }
      if (control.value !== matchingControl.value) {
        matchingControl.setErrors({ mustMatch: true });
      } else {
        matchingControl.setErrors(null);
      }
    };
  }

  onSubmit() 
  {
    $('#overlay').show();
    var fullname = this.registerForm.get('fullname').value;
    var username = this.registerForm.get('username').value;
    var mobile = this.registerForm.get('mobile').value;
    var email = this.registerForm.get('email').value;
    var password = this.registerForm.get('password').value;
    this.registerRequest=new RegisterRequest(fullname,username,mobile,email,password,'user');
    this.authService.registerUser(this.registerRequest).subscribe(
      (data) => {
        console.log(data);
        this.toaster.success("Registration Successful");
        this.toaster.info("Redirecting to Login Page");
        setTimeout(()=>{
          this.router.navigate(['']);
          $('#overlay').fadeOut(500);
        },3000)
      },
      (error) => {
        console.log(error);
        this.toaster.error('Registration Failed');
      }
    );
  }
}
