import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth-service.service';

@Component({
  selector: 'app-userlayout',
  templateUrl: './userlayout.component.html',
  styleUrls: ['./userlayout.component.scss']
})
export class UserlayoutComponent implements OnInit {

  constructor(private router:Router,private authService:AuthService) {
    if(this.authService.isLoggedIn()===true)
    {
      if(!this.authService.isUser())
      {
        this.router.navigate(['admin/dashboard']);
      }
    }
  }

  ngOnInit(): void {
  }

}
