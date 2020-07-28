import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/app/services/admin.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Area } from 'src/app/models/Area';
import { ParkingLocation } from 'src/app/models/Location';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';
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
  location: ParkingLocation;
  lot_form: FormGroup;
  isAdd:boolean=true;
 
  constructor(private adminService: AdminService,private formBuilder: FormBuilder,private toaster:ToastrService) {
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
    this.createForm();
  }

  ngOnInit(): void {
  }

  createForm(): void {
    this.lot_form = this.formBuilder.group({
      id:'',
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

  onSubmit(): void 
  {
    this.area=new Area(this.lot_form.get('area').value,this.lot_form.get('location').value);
    this.location=new ParkingLocation(this.lot_form.get('slot').value,this.area,this.lot_form.get('price').value);
    console.log(this.location);
    this.adminService.addParkingLocation(this.location).subscribe(
      (data) => {
        console.log(data);
        this.toaster.success(data['response']);
        $('#addForm').modal('hide');
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
    this.isAdd=true;
    this.lot_form.reset();
    document.getElementById('form-head').innerText="Add Parking Lot";
    $('#lot-form').modal('show');
  }
  
  showEditForm(location:any):void
  {
    this.isAdd=false;
    document.getElementById('form-head').innerText="Edit Parking Lot";
    this.lot_form.setValue({
      id:location.id,
      slot:location.slot,
      price:location.price_per_hour,
      area:location.area.area,
      location:location.area.location,
    });
    $('#lot-form').modal('show');
  }

  editParkingLot()
  {
    this.area=new Area(this.lot_form.get('area').value,this.lot_form.get('location').value);
    this.location=new ParkingLocation(this.lot_form.get('slot').value,this.area,this.lot_form.get('price').value);
    var id=this.lot_form.get('id').value;
    this.adminService.editParkingLocation(this.location,id).subscribe(
      (data) => {
        console.log(data);
        this.toaster.success(data['response']);
        $('#lot-form').modal('hide');
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  deleteParkingLot(location:any)
  {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: 'green',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.value) {
        this.adminService.deleteParkingLot(location.id).subscribe((data)=>{
          Swal.fire(
            'Deleted!',
             data['response'],
            'success'
          )
          setTimeout(()=>{
            window.location.reload();
          },3000);
        });
      }
    })
  }
}
