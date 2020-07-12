import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/app/services/admin.service';
import { FormGroup } from '@angular/forms';
declare var $:any;
@Component({
  selector: 'app-manageparkings',
  templateUrl: './manageparkings.component.html',
  styleUrls: ['./manageparkings.component.scss']
})
export class ManageparkingsComponent implements OnInit {
  tableData:[];
  addForm:FormGroup;
  constructor(private adminService:AdminService) {
    this.adminService.getParkingLocations().subscribe((data)=>{
      this.tableData=data;
    });
  }

  ngOnInit(): void {
  }
  
  onSubmit()
  {

  }
}
