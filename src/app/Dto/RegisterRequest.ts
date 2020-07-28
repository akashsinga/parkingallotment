import { timeoutWith } from 'rxjs/operators';

export class RegisterRequest{
  fullname:string;
  username:string;
  mobile:string;
  email:string;
  password:string;
  type:string;

  constructor(fullname:string,username:string,mobile:string,email:string,password:string,type:string)
  {
    this.fullname=fullname;
    this.username=username;
    this.mobile=mobile;
    this.email=email;
    this.password=password;
    this.type=type;
  }
}
