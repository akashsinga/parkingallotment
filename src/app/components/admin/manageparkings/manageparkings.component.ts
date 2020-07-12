import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/app/services/admin.service';

@Component({
  selector: 'app-manageparkings',
  templateUrl: './manageparkings.component.html',
  styleUrls: ['./manageparkings.component.scss']
})
export class ManageparkingsComponent implements OnInit {
  tableData:[];
  constructor(private adminService:AdminService) {
    this.adminService.getParkingLocations().subscribe((data)=>{
      this.tableData=data;
    });
  }

  ngOnInit(): void {
  }

}
