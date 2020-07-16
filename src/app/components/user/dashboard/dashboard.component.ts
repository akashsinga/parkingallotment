import { Component, OnInit,ElementRef,ViewChild } from '@angular/core';
import { location } from 'src/app/models/Location';
import { UserService } from 'src/app/services/user.service';
import { FormGroup } from '@angular/forms';
declare var $;
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  
  tableData:[];
  reserveForm:FormGroup;
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
