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
  bookings_count:number;
  tableData:[];
  constructor(private router:Router,private authService:AuthService,private adminService:AdminService) {
    this.authService.checkUserType();
    this.adminService.getDashboardCounts().subscribe((data)=>{
      this.user_count=data['user_count'];
      this.parkings_count=data['parkings_count'];
      this.locations_count=data['locations_count'];
      this.bookings_count=data['bookings_count'];
      this.tableData=data['bookings'];
    });
  }

  ngOnInit(): void {
  }

}
