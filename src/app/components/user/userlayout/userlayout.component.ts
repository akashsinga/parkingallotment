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
    this.authService.isLoggedIn();
    this.authService.checkUserType();
  }

  ngOnInit(): void {
  }

}
