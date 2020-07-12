import { Component, OnInit,ElementRef,ViewChild } from '@angular/core';
import { Location } from 'src/app/models/Location';
import { UserService } from 'src/app/services/user.service';
declare var $;
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  
  tableData:[];
  constructor(private userService:UserService)
  {
    this.userService.getLocations().subscribe((data)=>{
      this.tableData=data;
    });
  }
   ngOnInit():void{
   }
   ngAfterViewInit(){
    
   }

}
