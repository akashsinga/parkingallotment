import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth-service.service';
@Component({
  selector: 'user-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  constructor(private router: Router,private authService:AuthService) { 
  }

  ngOnInit(): void {
  }

  logoutUser(){
    this.authService.logoutUser();
  }
}
