import { Component, OnInit, ElementRef, ViewChild, NgZone } from '@angular/core';
import { ReserveParking } from 'src/app/Dto/ReserveParking';
import { UserService } from 'src/app/services/user.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import { WindowRefService,ICustomWindow } from 'src/app/services/window-ref.service';
declare var $;
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {

  tableData: [];
  reservedata:[];
  reserveForm: FormGroup;
  cost: number;
  reservation:ReserveParking;
  responseMsg:string;
  errMsg:string;

  private window:ICustomWindow;
  public rzp:any;
  
  public options:any={
    key:'rzp_test_2lC3r77dmEDTFZ',
    name:'MyParking',
    description:'Parking',
    amount:0,
    prefill:{
      name:'',
      email:''
    },
    notes:{},
    theme:{
      color:'#3880FF'
    },
    handler:this.paymentHandler.bind(this),
    modal:{
        ondismiss:(()=>{
          this.zone.run(()=>{
            this.errMsg="Parking Reservation Failed";
            setTimeout(() => {
              $('#reserveForm').modal('hide');
              window.location.reload();
            }, 1000);
          })
        })
    }
  }

  formErrors = {
    fromdatetime: '',
    todatetime: '',
  };

  validationMessages = {
    fromdatetime: {
      required: 'From Date Time is required',
      lessthan: 'From Date Time should be less than To Date Time',
      invalid: 'From Date Time should be 2 hours later from now',
    },
    todatetime: {
      lessthan: 'To Date Time should be greater than From Date Time',
      required: 'To Date Time is required',
    },
  };

  constructor(private userService: UserService,private zone:NgZone,private winRef:WindowRefService,private formBuilder: FormBuilder) 
  {
    this.userService.getLocations().subscribe((data) => {
      this.tableData = data;
    });
    this.createForm();
    this.initReservation();
    this.window=this.winRef.NativeWindow;
  }

  initReservation():void{
    this.reservation={
      user_id:0,
      area:'',
      location:'',
      slot:0,
      fromdatetime:'',
      todatetime:'',
      cost:0,
      paymentId:''
    };
  }

  ngOnInit(): void {}

  ngAfterViewInit() {}

  createForm(): void {
    this.reserveForm = this.formBuilder.group(
      {
        slot: '',
        price: '',
        fromdatetime: '',
        todatetime: '',
        area: '',
        location:'',
      },
      { validator: this.checkTimeDifference('fromdatetime', 'todatetime') }
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
    for (const field in this.formErrors) {
      if (this.formErrors.hasOwnProperty(field)) {
        this.formErrors[field] = '';
        const control = form.get(field);
        if (control && control.dirty && !control.valid) {
          const messages = this.validationMessages[field];
          for (const key in control.errors) {
            if (control.errors.hasOwnProperty(key)) {
              this.formErrors[field] += messages[key] + ' ';
            }
          }
        }
      }
    }
  }

  showReserveForm(): void {
    var table = $('#table').DataTable();
    table.on('click', '.reserve', function () {
      var tr = $(this).closest('tr');
      if ($(tr).hasClass('child')) {
        tr = tr.prev('.parent');
      }
      var data = table.row(tr).data();
      $('#slot').val(data[1]);
      $('#area').val(data[2]);
      $('#location').val(data[3]);
      $('#price').val(data[4]);
    });
    $('#reserveForm').modal('show');
  }

  checkTimeDifference(fromdate: any, todate: any) {
    return (formgroup: FormGroup) => {
      const from = formgroup.controls[fromdate];
      const to = formgroup.controls[todate];
      console.log(from.value);
      console.log(to.value);
      if (this.diff_hours(new Date(from.value),new Date())<2) {
        from.setErrors({ invalid: true });
      }
      else if(from.value > to.value)
      { 
        from.setErrors({lessthan:true});
      }
      else {
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

  initPayment():void
  {
    let user=JSON.parse(localStorage.getItem('user'));
    this.options.prefill.name=user['username'];
    this.options.amount=this.cost*100;
    this.rzp=new this.winRef.NativeWindow['Razorpay'](this.options);
    this.rzp.open();
  }

  paymentHandler(res:any)
  {
    $('#overlay').show();
    this.zone.run(()=>{
      console.log(res);
      var id=JSON.parse(localStorage.getItem("user"))['id'];
      this.reservation.user_id=id;
      this.reservation.area=(<HTMLInputElement>document.getElementById("area")).value;
      this.reservation.location=(<HTMLInputElement>document.getElementById("location")).value;
      this.reservation.slot=parseInt((<HTMLInputElement>document.getElementById("slot")).value);
      this.reservation.fromdatetime=this.reserveForm.get('fromdatetime').value;
      this.reservation.todatetime=this.reserveForm.get('todatetime').value;
      this.reservation.cost=this.cost;
      this.reservation.paymentId=res['razorpay_payment_id'];
      console.log(this.reservation);
      this.userService.reserveParking(this.reservation).subscribe((data)=>{
        console.log("Request Sent");
        this.responseMsg="Parking Successfully Booked";
        setTimeout(() => {
          $('#reserveForm').modal('hide');
          window.location.reload();
        }, 1000);
      },(error)=>{
        console.log(error);
      });
    });
    $('#overlay').fadeOut(500);
  }
}

