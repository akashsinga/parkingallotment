import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { AdminService } from 'src/app/services/admin.service';
import { GetReports } from 'src/app/Dto/GetReports';
import { ToastrService } from 'ngx-toastr';
declare var $:any;
@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.scss']
})
export class ReportsComponent implements OnInit {

  tableData=[];
  reportsForm:FormGroup;
  reports:GetReports;

  constructor(private adminService:AdminService,private fb:FormBuilder,private toaster:ToastrService) { 
    this.createForm();
  }

  createForm()
  {
    this.reportsForm=this.fb.group({
      fromdatetime:new Date().toJSON().slice(0,16),
      todatetime:new Date().toJSON().slice(0,16)
    })
  }

  ngOnInit(): void {
  }

  getReports()
  {
      $('#overlay').show();
      this.reports=new GetReports(this.reportsForm.get('fromdatetime').value,this.reportsForm.get('todatetime').value);
      this.adminService.getReports(this.reports).subscribe((data)=>{
        if(data.length!=0)
        {
          setTimeout(()=>{
            this.tableData=data;
            $('#overlay').hide();
          },3000);
        }
        else
        {
          this.toaster.error('No Reservations Available for Given Time Range');
        }
      });
  }
}
