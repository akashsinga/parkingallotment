import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import { RegisterRequest } from '../../Dto/RegisterRequest';
import { AuthService } from '../../services/auth-service.service';
import { Router } from '@angular/router';
import { uniqueUsernameValidator } from '../../shared/unique-username-validator.directive';
import { uniqueEmailValidator } from '../../shared/unique-email-validator.directive';
import { ToastrService } from 'ngx-toastr';
import { registerFormErrors } from 'src/app/shared/formErrors';
import { register } from 'src/app/shared/validationMessages';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup;
  registerRequest: RegisterRequest;
  formErrors=registerFormErrors;
  
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
        fullname: ['',[Validators.required,Validators.minLength(2),Validators.maxLength(25)]],
        username: ['',[Validators.required,Validators.minLength(2),Validators.maxLength(25),],[uniqueUsernameValidator(this.authService)]],
        mobile: ['', [Validators.required, Validators.pattern]],
        email: ['', [Validators.required, Validators.email],[uniqueEmailValidator(this.authService)]],
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
    for (const field in registerFormErrors) {
      if (registerFormErrors.hasOwnProperty(field)) {
        registerFormErrors[field] = '';
        const control = form.get(field);
        if (control && control.dirty && !control.valid) {
          const messages = register[field];
          for (const key in control.errors) {
            if (control.errors.hasOwnProperty(key)) {
              registerFormErrors[field] += messages[key] + ' ';
            }
          }
        }
      }
    }
  }

  checkPasswords(controlName: string, matchingControlName: string) {
    console.log('Checking Passwords');
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
        this.toaster.success("Registration Successful");
        this.toaster.info("Redirecting to Login Page");
        setTimeout(()=>{
          this.router.navigate(['']);
          $('#overlay').fadeOut(500);
        },3000)
      },
      (error) => {
        $('#overlay').hide();
        console.log(error);
        this.toaster.error("Please Try After Some Time");
      }
    );
  }
}
