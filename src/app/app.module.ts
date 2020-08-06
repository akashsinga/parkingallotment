import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { DataTablesModule } from 'angular-datatables';
import { AgmCoreModule } from '@agm/core';
//component imports
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { DashboardComponent as AdminDashboard} from './components/admin/dashboard/dashboard.component';
import { DashboardComponent as UserDashboard } from './components/user/dashboard/dashboard.component';
import { UserlayoutComponent } from './components/user/userlayout/userlayout.component';
import { HeaderComponent as UserHeader} from './components/user/header/header.component';
import { AdminlayoutComponent } from './components/admin/adminlayout/adminlayout.component';
import { NavbarComponent } from './components/admin/navbar/navbar.component';
import { ManageparkingsComponent } from './components/admin/manageparkings/manageparkings.component';
import { MybookingsComponent } from './components/user/mybookings/mybookings.component';
import { ManageusersComponent } from './components/admin/manageusers/manageusers.component';
import { ForgotpasswordComponent } from './components/forgotpassword/forgotpassword.component';
import { ReportsComponent } from './components/admin/reports/reports.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    AdminDashboard,
    UserDashboard,
    UserlayoutComponent,
    UserHeader,
    AdminlayoutComponent,
    NavbarComponent,
    ManageparkingsComponent,
    MybookingsComponent,
    ManageusersComponent,
    ForgotpasswordComponent,
    ReportsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    HttpClientModule,
    DataTablesModule,
    ToastrModule.forRoot({
      timeOut:3000,
      positionClass:'toast-top-right',
      preventDuplicates:true
    }),
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyCIFPolMMtcTCfqyGA1vqBvEv9zKH-uNqg'
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
