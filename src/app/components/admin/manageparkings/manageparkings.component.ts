import { Component,OnInit,ViewChild,ViewEncapsulation} from '@angular/core';
import { AdminService } from 'src/app/services/admin.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ParkingLot } from 'src/app/models/Location';
import { ToastrService } from 'ngx-toastr';
import { MouseEvent,MapsAPILoader } from '@agm/core';
import Swal from 'sweetalert2';
import { Owner } from 'src/app/models/Owner';
import { add_lot } from 'src/app/shared/validationMessages';  
import { addParkingFormErrors } from 'src/app/shared/formErrors';
declare var $: any;
@Component({
  selector: 'app-manageparkings',
  templateUrl: './manageparkings.component.html',
  styleUrls: ['./manageparkings.component.scss'],
})
export class ManageparkingsComponent implements OnInit {

  tableData: [];
  lot_form: FormGroup;
  isAdd:boolean=true;
  latitude:number;
  longitude:number;
  owner:Owner;
  parking_lot:ParkingLot;
  addParkingFormErrors=addParkingFormErrors;
  icon="../../../../assets/img/blue-dot.png";

  constructor(private adminService: AdminService,private formBuilder: FormBuilder,private toaster:ToastrService) {
    this.adminService.getParkingLocations().subscribe((data) => {
      this.tableData = data;
    });
    this.createForm();
    this.toaster.info("Double Click on the map to Add a Parking Lot");
  }
  
  ngOnInit(): void {
    if (window.navigator && window.navigator.geolocation) {
      window.navigator.geolocation.getCurrentPosition(
          position => {
            this.latitude=position.coords.latitude;
            this.longitude=position.coords.longitude;
      });
    };
  }

  mapClicked($event: MouseEvent) {
    this.latitude= $event.coords.lat;
    this.longitude= $event.coords.lng;
    this.showAddForm(this.latitude,this.longitude);
  }
  
  createForm(): void {
    this.lot_form = this.formBuilder.group({
      id:'',
      owner_name:['',Validators.required],
      owner_email:['',[Validators.required,Validators.email]],
      owner_mobile:['',[Validators.required,Validators.pattern]],
      name: ['', Validators.required],
      latitude: ['', Validators.required],
      longitude: ['', Validators.required],
      price: ['', [Validators.required,Validators.pattern]],
    });
    this.owner={
      name:'',
      email:'',
      mobile:''
    }
    this.parking_lot={
      name:'',
      latitude:'',
      longitude:'',
      price_per_hour:0,
      owner:this.owner
    }
    this.lot_form.valueChanges.subscribe((data) =>
      this.onValueChanged(data)
    );
    this.onValueChanged();
  }

  onValueChanged(data?: any) {
    if (!this.lot_form) {
      return;
    }
    const form = this.lot_form;
    for (const field in addParkingFormErrors) {
      if (addParkingFormErrors.hasOwnProperty(field)) {
         addParkingFormErrors[field] = '';
        const control = form.get(field);
        if (control && control.dirty && !control.valid) {
          const messages = add_lot[field];
          for (const key in control.errors) {
            if (control.errors.hasOwnProperty(key)) {
              addParkingFormErrors[field] += messages[key] + ' ';
            }
          }
        }
      }
    }
  }

  onSubmit(): void 
  {
    this.owner=new Owner(this.lot_form.get('owner_name').value,this.lot_form.get('owner_email').value,this.lot_form.get('owner_mobile').value);
    this.parking_lot=new ParkingLot(this.lot_form.get('name').value,this.lot_form.get('latitude').value,this.lot_form.get('longitude').value,this.lot_form.get('price').value,this.owner);
    console.log(this.parking_lot);
    this.adminService.addParkingLocation(this.parking_lot).subscribe(
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

  showAddForm(latitude:any,longitude:any):void
  {
    this.isAdd=true;
    this.lot_form.reset();
    this.lot_form.setValue({
      id:'',
      owner_name:'',
      owner_email:'',
      owner_mobile:'',
      name:'',
      price:'',
      latitude:latitude,
      longitude:longitude
    })
    document.getElementById('form-head').innerText="Add Parking Lot";
    $('#lot-form').modal('show');
  }
  
  showEditForm(location:any):void
  {
    this.isAdd=false;
    document.getElementById('form-head').innerText="Edit Parking Lot";
    this.lot_form.setValue({
      id:location.id,
      owner_name:location.owner.name,
      owner_email:location.owner.email,
      owner_mobile:location.owner.mobile,
      name:location.name,
      latitude:location.latitude,
      price:location.price_per_hour,
      longitude:location.longitude,
    });
    $('#lot-form').modal('show');
  }

  editParkingLot()
  {
    this.owner=new Owner(this.lot_form.get('owner_name').value,this.lot_form.get('owner_email').value,this.lot_form.get('owner_mobile').value);
    this.parking_lot=new ParkingLot(this.lot_form.get('name').value,this.lot_form.get('latitude').value,this.lot_form.get('longitude').value,this.lot_form.get('price').value,this.owner);
    var id=this.lot_form.get('id').value;
    this.adminService.editParkingLocation(this.parking_lot,id).subscribe(
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
