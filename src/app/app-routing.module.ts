import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { DashboardComponent as UserDashboard } from './components/user/dashboard/dashboard.component';
import { DashboardComponent as AdminDashboard } from './components/admin/dashboard/dashboard.component';
import { UserlayoutComponent } from './components/user/userlayout/userlayout.component';
import { AdminlayoutComponent } from './components/admin/adminlayout/adminlayout.component';
import { ManageparkingsComponent } from './components/admin/manageparkings/manageparkings.component';
import { ManageareasComponent } from './components/admin/manageareas/manageareas.component';

const routes: Routes = [
  //auth routes
  { path: '', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  //user routes
  {
    path: 'user',
    component: UserlayoutComponent,
    children: [
      {
        path: 'dashboard',
        component: UserDashboard,
      },
    ],
  },
  //admin routes
  {
    path: 'admin',
    component: AdminlayoutComponent,
    children: [
      { path: 'dashboard', component: AdminDashboard },
      { path: 'parkings/slots', component: ManageparkingsComponent },
      { path: 'parkings/areas', component: ManageareasComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
