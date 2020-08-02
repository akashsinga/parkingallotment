import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth-service.service';
import { VerifyCode } from 'src/app/Dto/VerifyCode';
import { resetPassword } from 'src/app/shared/validationMessages';
import { resetPasswordFormErrors } from 'src/app/shared/formErrors';
import { ResetPassword } from 'src/app/Dto/ResetPassword';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
declare var $:any;
@Component({
  selector: 'app-forgotpassword',
  templateUrl: './forgotpassword.component.html',
  styleUrls: ['./forgotpassword.component.scss']
})
export class ForgotpasswordComponent implements OnInit {

  forgotPassword:FormGroup;
  codeSent:boolean=false;
  verify:VerifyCode;
  passwordReset:FormGroup;
  formerrors=resetPasswordFormErrors;

  reset:ResetPassword;
  constructor(private fb:FormBuilder,private toaster:ToastrService,private authService:AuthService,private router:Router) {
    this.createForm();
  }

  createForm()
  {
    this.forgotPassword=this.fb.group({
      email:'',
      code:''
    });
    this.passwordReset = this.fb.group({
        password: ['', [Validators.required, Validators.minLength(6)]],
        confirmpassword: ['',[Validators.required, Validators.minLength(6)]],
      },
      { validator: this.checkPasswords('password', 'confirmpassword')},
    );

    this.passwordReset.valueChanges.subscribe((data) =>
      this.onValueChanged(data)
    );

    this.onValueChanged();
  }

  onValueChanged(data?: any) {
    if (!this.passwordReset) {
      return;
    }
    const form = this.passwordReset;
    for (const field in resetPasswordFormErrors) {
      if (resetPasswordFormErrors.hasOwnProperty(field)) {
        resetPasswordFormErrors[field] = '';
        const control = form.get(field);
        if (control && control.dirty && !control.valid) {
          const messages = resetPassword[field];
          for (const key in control.errors) {
            if (control.errors.hasOwnProperty(key)) {
              resetPasswordFormErrors[field] += messages[key] + ' ';
            }
          }
        }
      }
    }
  }

  ngOnInit(): void {
  }

  onSubmit()
  {
    $('#overlay').show();
      this.authService.sendVerificationCode(this.forgotPassword.get('email').value).subscribe((data)=>{
        this.toaster.success(data['response']);
        this.codeSent=true;
        $('.verification_code').css('display','block');
        $('#overlay').hide();
      });
  }

  showPasswordResetForm()
  {
    console.log('inside');
    this.verify=new VerifyCode(this.forgotPassword.get('email').value,this.forgotPassword.get('code').value);
    console.log(this.verify);
      this.authService.verifyCode(this.verify).subscribe((data)=>{
        if(data['response']=="true")
        {
          $('#passwordReset').modal('show');
        }
        else
        {
          this.toaster.error("Incorrect Verification Code");
        }
    });
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

  resetPassword()
  {
    $('#overlay').show();
    this.reset=new ResetPassword(this.forgotPassword.get('email').value,this.passwordReset.get('password').value);
    this.authService.resetPassword(this.reset).subscribe((data)=>{
      Swal.fire({
        icon: 'success',
        title: 'Password Successfully Reset',
        showConfirmButton: false,
        timer: 1500
      })
      this.toaster.warning('Redirecting to Login');
      setTimeout(()=>{
        this.router.navigate(['']);
        $('#overlay').hide();
      },2000);
    })
  }

  showCodeInput()
  {
    this.codeSent=true;
    $('.verification_code').css('display','block');
  }
}
