import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth-service.service';
import { AdminService } from 'src/app/services/admin.service';
declare var $:any;
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
    this.adminService.getDashboardCounts().subscribe((data)=>{
      this.user_count=data['user_count'];
      this.parkings_count=data['parkings_count'];
      this.bookings_count=data['bookings_count'];
      this.tableData=data['bookings'];
    });
  }

  ngOnInit(): void {
  }

  showDetails(booking:any)
  {
    console.log(booking);
    document.getElementById('id').innerText=booking.id;
    document.getElementById('booking_date').innerText=booking.booking_date;
    document.getElementById('reservee').innerText=booking.user.fullname;
    document.getElementById('payment_id').innerText=booking.payment_Id;
    document.getElementById('area').innerText=booking.location.name;
    document.getElementById('from_datetime').innerText=booking.fromdatetime;
    document.getElementById('to_datetime').innerText=booking.todatetime;
    document.getElementById('cost').innerText="₹ "+booking.cost;
    $('#booking_details').modal('show');
  }
}
