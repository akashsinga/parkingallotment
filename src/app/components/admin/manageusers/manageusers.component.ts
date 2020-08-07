import { Component, ViewChild,ElementRef,OnInit } from '@angular/core';
import { AdminService } from 'src/app/services/admin.service';
import { ToastrService } from 'ngx-toastr';
import { FormGroup, FormBuilder } from '@angular/forms';
declare var $:any;
@Component({
  selector: 'app-manageusers',
  templateUrl: './manageusers.component.html',
  styleUrls: ['./manageusers.component.scss']
})
export class ManageusersComponent implements OnInit {
  @ViewChild('dataTable') table:ElementRef;
  dataTable:any;
  tableData=[];
  userEditForm:FormGroup;
  constructor(private adminService:AdminService,private toaster:ToastrService,private fb:FormBuilder) { 
    this.adminService.getUsers().subscribe((data)=>{
      this.tableData=data;
    });
    this.createForm();
  }

  ngOnInit(): void {
  }

  ngAfterViewInit(){
    setTimeout(()=>{
      this.dataTable=$(this.table.nativeElement);
      this.dataTable.dataTable();
    },1000);
  }
  createForm()
  {
    this.userEditForm=this.fb.group({
      id:'',
      username:'',
      fullname:'',
      email:'',
      role:''
    })
  }

  showEditForm(user:any)
  {
    this.userEditForm.setValue({
      id:user.id,
      username:user.username,
      fullname:user.fullname,
      email:user.email,
      role:user.type
    })
    $('#userEditForm').modal('show');
  }

  editUser()
  {
    var id=this.userEditForm.get('id').value;
    var role=this.userEditForm.get('role').value;
    this.adminService.editUser(id,role).subscribe((data)=>{
      this.toaster.success('Modified User Role');
      $('#userEditForm').modal('hide');
    })
  }
}
