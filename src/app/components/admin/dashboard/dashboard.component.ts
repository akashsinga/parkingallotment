import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth-service.service';
import { AdminService } from 'src/app/services/admin.service';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  user_count:number;
  parkings_count:number;
  locations_count:number;
  constructor(private router:Router,private authService:AuthService,private adminService:AdminService) {
    this.authService.checkUserType();
    this.adminService.getUserCount().subscribe((data)=>{
      this.user_count=data['response']
    });
    this.adminService.getParkingsCount().subscribe((data)=>this.parkings_count=data['response']);
    this.adminService.getAreasCount().subscribe((data)=>this.locations_count=data['response']);
  }

  ngOnInit(): void {
  }

}
