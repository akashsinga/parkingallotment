import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { DashboardComponent as UserDashboard } from './components/user/dashboard/dashboard.component';
import { DashboardComponent as AdminDashboard } from './components/admin/dashboard/dashboard.component';
import { UserlayoutComponent } from './components/user/userlayout/userlayout.component';
import { AdminlayoutComponent } from './components/admin/adminlayout/adminlayout.component';
import { ManageparkingsComponent } from './components/admin/manageparkings/manageparkings.component';
import { MybookingsComponent } from './components/user/mybookings/mybookings.component';
import { ManageusersComponent } from './components/admin/manageusers/manageusers.component';
import { ForgotpasswordComponent } from './components/forgotpassword/forgotpassword.component';
import { ReportsComponent } from './components/admin/reports/reports.component';
import { AuthGuard } from './guards/auth-guard.guard';
const routes: Routes = [
  //auth routes
  { path: '', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'forgot', component: ForgotpasswordComponent },
  //user routes
  {
    path: 'user',
    component: UserlayoutComponent,
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashboard', component: UserDashboard },
      { path: 'bookings', component: MybookingsComponent },
    ],
  },
  //admin routes
  {
    path: 'admin',
    component: AdminlayoutComponent,
    canActivate: [AuthGuard],
    canActivateChild: [AuthGuard],
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashboard', component: AdminDashboard },
      { path: 'parkings/lots', component: ManageparkingsComponent },
      { path: 'users', component: ManageusersComponent },
      { path: 'reports', component: ReportsComponent },
    ],
  },
  { path: '**', redirectTo: 'admin' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
