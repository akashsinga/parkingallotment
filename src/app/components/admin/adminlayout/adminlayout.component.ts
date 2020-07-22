import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth-service.service';
@Component({
  selector: 'app-adminlayout',
  templateUrl: './adminlayout.component.html',
  styleUrls: ['./adminlayout.component.scss']
})
export class AdminlayoutComponent implements OnInit {

  constructor(private router:Router,private authService:AuthService) {
    if(!this.authService.isAdmin())
    {
      this.router.navigate(['user/dashboard']);
    }
  }

  ngOnInit(): void {
  }

}
