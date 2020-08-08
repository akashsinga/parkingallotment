import { Injectable } from '@angular/core';
import * as CryptoJS from 'crypto-js';
@Injectable({
  providedIn: 'root'
})
export class StorageService {

  private KEY="Myparking";
  constructor() { }

  encrypt(data:string):string
  {
    return CryptoJS.AES.encrypt(data,this.KEY).toString();
  }

  decrypt(data:string):string
  {
    return CryptoJS.AES.decrypt(data,this.KEY).toString(CryptoJS.enc.Utf8);
  }

  storeUser(data:any)
  {
    sessionStorage.setItem("user",this.encrypt(JSON.stringify(data)));
  }

  getUser():any
  {
    return JSON.parse(this.decrypt(sessionStorage.getItem("user")));
  }
}
