import {Component,OnInit,NgZone} from '@angular/core';
import { ReserveParking } from 'src/app/Dto/ReserveParking';
import { UserService } from 'src/app/services/user.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import {WindowRefService,ICustomWindow} from 'src/app/services/window-ref.service';
import { CheckAvailability } from 'src/app/Dto/CheckAvailability';
import { ToastrService } from 'ngx-toastr';
import { reservation } from 'src/app/shared/validationMessages';
import { reservationFormErrors } from 'src/app/shared/formErrors';
import Swal from 'sweetalert2';
declare var $;
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  
  tableData: [];
  reserveForm: FormGroup;
  cost: number;
  reservation: ReserveParking;
  check: CheckAvailability;
  continue:boolean;
  addToWaiting:boolean=false;
  latitude:number;
  longitude:number;
  formErrors = reservationFormErrors;
  icon="../../../../assets/img/blue-dot.png";

  private window: ICustomWindow;
  public rzp: any;

  public options: any = {
    key: 'rzp_test_2lC3r77dmEDTFZ',
    name: 'MyParking',
    description: 'Parking',
    amount: 0,
    prefill: {
      name: '',
      email: '',
    },
    notes: {},
    theme: {
      color: '#3880FF',
    },
    handler: this.paymentHandler.bind(this),
    modal: {
      ondismiss: () => {
        this.zone.run(() => {
          this.toaster.error('Parking Reservation Failed');
            $('#reserveForm').modal('hide');
        });
      },
    },
  };

  constructor(private userService: UserService,private zone: NgZone,private winRef: WindowRefService,private formBuilder: FormBuilder,private toaster:ToastrService) {
    this.userService.getLocations().subscribe((data) => {
      this.tableData = data;
    });
    this.createForm();
    this.initReservation();
    this.window = this.winRef.NativeWindow;
  }

  initReservation(): void {
    this.reservation = {
      user_id: 0,
      parking_id:0,
      fromdatetime: '',
      todatetime: '',
      cost: 0,
      paymentId: '',
      status:''
    };
    this.check = {
      fromdatetime: '',
      todatetime:'',
      parking_id:0
    };
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

  ngAfterViewInit() {}

  createForm(): void {
    this.reserveForm = this.formBuilder.group(
      {
        parking_id: '',
        name:'',
        price: '',
        fromdatetime: ['', Validators.required],
        todatetime: ['', Validators.required],
      },
      {
        validator: [this.checkTimeDifference('fromdatetime', 'todatetime')],
      }
    );
    this.reserveForm.valueChanges.subscribe((data) =>
      this.onValueChanged(data)
    );
    this.onValueChanged();
  }

  onValueChanged(data?: any) {
    if (!this.reserveForm) {
      return;
    }
    const form = this.reserveForm;
    for (const field in reservationFormErrors) {
      if (reservationFormErrors.hasOwnProperty(field)) {
        reservationFormErrors[field] = '';
        const control = form.get(field);
        if (control && control.dirty && !control.valid) {
          const messages = reservation[field];
          for (const key in control.errors) {
            if (control.errors.hasOwnProperty(key)) {
              this.formErrors[field] += messages[key] + ' ';
            }
          }
        }
      }
    }
  }

  showReserveForm(row:any): void {
    this.reserveForm.setValue({
      parking_id:row.id,
      price:row.price_per_hour,
      name:row.name,
      fromdatetime:'',
      todatetime:''
    });
    $('#reserveForm').modal('show');
  }

  checkTimeDifference(fromdate: any, todate: any) {
    return (formgroup: FormGroup) => {
      const from = formgroup.controls[fromdate];
      const to = formgroup.controls[todate];
      console.log(from.value);
      console.log(to.value);
      if (this.diff_hours(new Date(from.value), new Date()) < 2) {
        from.setErrors({ invalid: true });
      }
      else if (from.value > to.value) {
        from.setErrors({ lessthan: true });
      } else {
        from.setErrors(null);
        var hours = this.diff_hours(new Date(to.value), new Date(from.value));
        var cost = $('#price').val();
        this.cost = Number((cost * hours).toFixed(2));
      }
    };
  }

  diff_hours(dt2, dt1) {
    var diff = (dt2.getTime() - dt1.getTime()) / 1000;
    diff /= 60 * 60;
    return Math.abs(diff);
  }

  initPayment(): void 
  {
    this.checkAvailability(this.reserveForm.get('fromdatetime').value,this.reserveForm.get('todatetime').value);
  }

  paymentHandler(res: any) {
    this.zone.run(() => {
      var id = JSON.parse(localStorage.getItem('user'))['id'];
      var parking_id = parseInt((<HTMLInputElement>document.getElementById('parking_id')).value);
      var fromdatetime = this.reserveForm.get('fromdatetime').value;
      var todatetime = this.reserveForm.get('todatetime').value;
      var cost = this.cost;
      var paymentId = res['razorpay_payment_id'];
      this.reservation=new ReserveParking(id,parking_id,fromdatetime,todatetime,paymentId,cost,this.addToWaiting?"waiting":"reserved");
      $('#overlay').show();
      this.userService.reserveParking(this.reservation).subscribe(
        (data) => {
          $('#reserveForm').modal('hide');
          Swal.fire({
            icon: 'success',
            title: 'Parking Successfully Reserved',
            showConfirmButton: false,
            timer: 1500
          })
        },
        (error) => {
          console.log(error);
        }
      );
      $('#overlay').hide();
    });
  }

  checkAvailability(fromdatetime:any,todatetime:any)
  {
    console.log(fromdatetime);
    var parking_id = parseInt((<HTMLInputElement>document.getElementById('parking_id')).value);
    this.check=new CheckAvailability(fromdatetime,todatetime,parking_id);
    this.userService.isAvailable(this.check).subscribe((data)=>
    {
      if(data['response']=="true")
      {
        Swal.fire({
          title:'Parking Already Reserved',
          text: "Do You Want to Join the Waiting List?",
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: 'green',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Yes, continue'
        }).then((result) => {
          if (result.value) {
            this.continue=true;
            this.addToWaiting=true;
            let user = JSON.parse(localStorage.getItem('user'));
            this.options.prefill.name = user['username'];
            this.options.amount = this.cost * 100;
            this.rzp = new this.winRef.NativeWindow['Razorpay'](this.options);
            this.rzp.open();
          }
          else
          {
            this.continue=false;
            $('#reserveForm').modal('hide');
            this.toaster.error('Parking Reservation Failed');
          }
        })
      }
      else
      {
        this.addToWaiting=false;
        let user = JSON.parse(localStorage.getItem('user'));
        this.options.prefill.name = user['username'];
        this.options.amount = this.cost * 100;
        this.rzp = new this.winRef.NativeWindow['Razorpay'](this.options);
        this.rzp.open();
      }
    });
  }
}
