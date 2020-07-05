import { Component, OnInit,ElementRef,ViewChild } from '@angular/core';
import { Router } from '@angular/router';
declare var $;
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  @ViewChild('dataTable') table:ElementRef;
  dataTable:any;
  constructor(private router:Router)
  {
      if(localStorage.getItem("user")===null)
      {
        this.router.navigate(['']);
      }
  }
   ngOnInit(){

   }
   ngAfterViewInit(){
    this.dataTable=$(this.table.nativeElement);
    this.dataTable.dataTable();
   }

}
