import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { AdminService } from 'src/app/services/admin.service';
import { GetReports } from 'src/app/Dto/GetReports';
import { ToastrService } from 'ngx-toastr';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
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
        setTimeout(()=>{
          if(data.length!=0)
          {
            this.tableData=data;
          }
          else
          {
            this.toaster.error('No Reservations made in given time range');
          }
          $('#overlay').hide();
        },3000);
      });
  }

  downloadReports()
  {
    const doc = new jsPDF();
    autoTable(doc, { html: '#reports' });
    doc.save('table.pdf')
  }
}
