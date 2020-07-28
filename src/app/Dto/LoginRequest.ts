export class LoginRequest
{
  username:String;
  password:String;

  constructor(username:string,password:string)
  {
    this.username=username;
    this.password=password;
  }
}
