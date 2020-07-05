import { Component, OnInit,ElementRef,ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth-service.service';
declare var $;
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  @ViewChild('dataTable') table:ElementRef;
  dataTable:any;
  constructor()
  {
  }
   ngOnInit(){

   }
   ngAfterViewInit(){
    this.dataTable=$(this.table.nativeElement);
    this.dataTable.dataTable();
   }

}
