import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { AdminService } from 'src/app/services/admin.service';
import { AddArea } from 'src/app/Dto/AddArea';
declare var $;

@Component({
  selector: 'app-manageareas',
  templateUrl: './manageareas.component.html',
  styleUrls: ['./manageareas.component.scss'],
})
export class ManageareasComponent implements OnInit {
  responseMsg: string;
  errMsg: string;
  addArea: AddArea;
  addForm: FormGroup;
  tableData: [];
  constructor(
    private adminService: AdminService,
    private formBuilder: FormBuilder
  ) {
    this.createForm();
    this.adminService.getParkingAreas().subscribe((data) => {
      this.tableData = data;
    });
  }

  ngOnInit(): void {}

  showAddForm():void{
    $('#addForm').modal('show');
  }

  createForm() {
    this.addForm = this.formBuilder.group({
      area: '',
      location: '',
    });
    this.addArea = {
      area: '',
      location: '',
    };
  }

  onSubmit(): void {
    this.addArea.area = this.addForm.get('area').value;
    this.addArea.location = this.addForm.get('location').value;
    this.adminService.addParkingArea(this.addArea).subscribe(
      (data) => {
        this.responseMsg = data['response'];
        $('#addForm').modal('toggle');
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      },
      (error) => {
        console.log(error);
        this.errMsg = 'Area Addition Failed';
      }
    );
  }
}
