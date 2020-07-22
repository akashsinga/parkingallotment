import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-mybookings',
  templateUrl: './mybookings.component.html',
  styleUrls: ['./mybookings.component.scss']
})
export class MybookingsComponent implements OnInit {

  tableData:[];
  errMsg:string;
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

}
