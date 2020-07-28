import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import * as pdf from 'jspdf';
declare var $:any;
@Component({
  selector: 'app-mybookings',
  templateUrl: './mybookings.component.html',
  styleUrls: ['./mybookings.component.scss']
})
export class MybookingsComponent implements OnInit {

  tableData:[];
  errMsg:string;
  bookingData:any;
  constructor(private userService:UserService) {
    this.userService.getPreviousBookings().subscribe((data)=>{
      if(data.hasOwnProperty('response'))
      {
        this.errMsg=data['response'];
      }
      else
      {
        this.tableData=data;
      }
    });
  }

  ngOnInit(): void {
  }

  showDetails(booking:any)
  {
    console.log(booking);
    document.getElementById('id').innerText=booking.id;
    document.getElementById('booking_date').innerText=booking.booking_date;
    document.getElementById('payment_id').innerText=booking.payment_Id;
    document.getElementById('slot').innerText=booking.location.slot;
    document.getElementById('location').innerText=booking.location.area.location;
    document.getElementById('area').innerText=booking.location.area.area;
    document.getElementById('from_datetime').innerText=booking.fromdatetime;
    document.getElementById('to_datetime').innerText=booking.todatetime;
    document.getElementById('cost').innerText="₹ "+booking.cost;
    $('#booking_details').modal('show');
  }

  downloadReceipt(booking:any)
  {
    const doc=new pdf('p','mm',[600,580]);
    doc.setFontSize(22);
    doc.text('MyParking',15,15);
    doc.setFontSize(10);
    doc.text('Madhapur, Hyderabad.',16,20);
    doc.text('Parking Receipt',170,22);
    doc.line(15,25,200,25,'F');
    doc.setFontSize(11);
    doc.text('Booking ID : '+booking.id,16,35);
    doc.text('Payment ID : '+booking.payment_Id,16,40);
    doc.text('Booking Date : '+booking.booking_date,16,45);
    doc.text('Parking Slot : '+booking.location.slot,40,60);
    doc.text('Parking Area : '+booking.location.area.area,40,65);
    doc.text('Parking Location : '+booking.location.area.location,40,70);
    doc.line(35,75,175,75,'F');
    doc.text('From : ',40,85);
    doc.text(booking.fromdatetime,130,85);
    doc.text('To : ',40,90);
    doc.text(booking.todatetime,130,90);
    doc.text('Duration : ',40,95);
    doc.text(''+this.diff_hours(new Date(booking.fromdatetime),new Date(booking.todatetime))+' hour(s)',130,95);
    doc.line(35,105,175,105,'F');
    doc.setFontSize(15);
    doc.text('Total Cost : ',40,115);
    doc.text('INR '+booking.cost,130,115);
    doc.setFontSize(8);
    doc.text('Including Service Charge',41,120);
    doc.line(35,125,175,125,'F');
    doc.setFontSize(15);
    doc.text('Thank You and Drive Safely',70,140);
    // doc.output('dataurlnewwindow');
    doc.save(booking.booking_date+"_"+booking.id);
  }

  diff_hours(dt2, dt1) {
    var diff = (dt2.getTime() - dt1.getTime()) / 1000;
    diff /= 60 * 60;
    return Math.abs(diff);
  }
}
