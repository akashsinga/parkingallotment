import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/app/services/admin.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Area } from 'src/app/models/Area';
import { location } from 'src/app/models/Location';
declare var $: any;
@Component({
  selector: 'app-manageparkings',
  templateUrl: './manageparkings.component.html',
  styleUrls: ['./manageparkings.component.scss'],
})
export class ManageparkingsComponent implements OnInit {

  tableData: [];
  areas: [];
  locations: [];
  area: Area;
  location: location;
  addForm: FormGroup;
  errMsg: string;
  responseMsg: string;
  constructor(private adminService: AdminService,private formBuilder: FormBuilder) {
    this.createForm();
    this.adminService.getParkingLocations().subscribe((data) => {
      this.tableData = data;
    });
    this.adminService.getAreas().subscribe((data) => {
      console.log(data);
      this.areas = data;
    });
    this.adminService.getLocations().subscribe((data) => {
      console.log(data);
      this.locations = data;
    });
  }

  ngOnInit(): void {
  }

  createForm(): void {
    this.addForm = this.formBuilder.group({
      slot: ['', Validators.required],
      area: ['', Validators.required],
      location: ['', Validators.required],
      price: ['', Validators.required],
    });
    this.area = {
      area: '',
      location: '',
    };
    this.location = {
      slot: 0,
      area: this.area,
      price_per_hour: 0,
    };
  }

  onSubmit(): void {
    this.area.area = this.addForm.get('area').value;
    this.area.location = this.addForm.get('location').value;
    this.location.slot = this.addForm.get('slot').value;
    this.location.area = this.area;
    this.location.price_per_hour = this.addForm.get('price').value;

    console.log(this.location);
    this.adminService.addParkingLocation(this.location).subscribe(
      (data) => {
        console.log(data);
        this.responseMsg = data['response'];
        $('#addForm').modal('toggle');
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  showAddForm():void
  {
    $('#addForm').modal('show');
  }
  
  showEditForm():void{
    var table=$('#table').DataTable();
    table.on('click','.edit',function(){
      var tr=$(this).closest('tr');
      if($(tr).hasClass('child'))
      {
        tr=tr.prev('.parent');
      }
      var data=table.row(tr).data();
      $('#slot').val(data[1]);
      $('#area').val(data[2]);
      $('#location').val(data[3]);
      $('#price').val(data[4]);
      $('#editForm').modal('show');
    });
  }
}
