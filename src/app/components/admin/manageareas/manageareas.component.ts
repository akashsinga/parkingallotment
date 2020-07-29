import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { AdminService } from 'src/app/services/admin.service';
import { ToastrService } from 'ngx-toastr';
import { Area } from 'src/app/models/Area';
import Swal from 'sweetalert2';
declare var $;

@Component({
  selector: 'app-manageareas',
  templateUrl: './manageareas.component.html',
  styleUrls: ['./manageareas.component.scss'],
})
export class ManageareasComponent implements OnInit {

  addArea: Area;
  area_form: FormGroup;
  tableData: [];
  isAdd:boolean=true;

  constructor(private adminService: AdminService,private formBuilder: FormBuilder,private toaster:ToastrService) {
    this.createForm();
    this.adminService.getParkingAreas().subscribe((data) => {
      this.tableData = data;
      console.log(data);
    });
  }

  ngOnInit(): void {}

  showAddForm():void
  {
    this.isAdd=true;
    this.area_form.reset();
    document.getElementById("form-head").innerText="Add Parking Area";
    $('#area_form').modal('show');
  }

  createForm() {
    this.area_form = this.formBuilder.group({
      id:'',
      area: '',
      location: '',
    });
    this.addArea = {
      area: '',
      location: '',
    };
  }

  onSubmit(): void {
    this.addArea=new Area(this.area_form.get('area').value,this.area_form.get('location').value);
    this.adminService.addParkingArea(this.addArea).subscribe(
      (data) => {
        this.toaster.success(data['response']);
        $('#area_form').modal('hide');
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      },
      (error) => {
        console.log(error);
        this.toaster.error('Area Addition Failed');
      }
    );
  }

  showEditForm(area:any)
  {
    this.isAdd=false;
    document.getElementById("form-head").innerText="Edit Parking Area";
    this.area_form.setValue({
      id:area.id,
      area:area.area,
      location:area.location
    });
    $('#area_form').modal('show');
  }

  editParkingArea()
  {
    this.addArea=new Area(this.area_form.get('area').value,this.area_form.get('location').value);
    this.adminService.editParkingArea(this.addArea,this.area_form.get('id').value).subscribe(
      (data) => {
        this.toaster.success(data['response']);
        $('#area_form').modal('hide');
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      },
      (error) => {
        console.log(error);
        this.toaster.error('Area Updation Failed');
      }
    );
  }

  deleteParkingArea(area:any)
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
        this.adminService.deleteParkingArea(area.id).subscribe((data)=>{
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
