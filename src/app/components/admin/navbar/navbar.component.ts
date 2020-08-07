import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../services/auth-service.service';
@Component({
  selector: 'admin-nav',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  constructor(private authService:AuthService) {
   }

  ngOnInit(): void {
  }
  
  logoutUser()
  {
    this.authService.logoutUser();
  }
}
