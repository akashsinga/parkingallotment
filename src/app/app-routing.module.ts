import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { DashboardComponent as UserDashboard} from './components/user/dashboard/dashboard.component';
import { DashboardComponent as AdminDashboard} from './components/admin/dashboard/dashboard.component';
import { UserlayoutComponent } from './components/user/userlayout/userlayout.component';

const routes: Routes = [
  //auth routes
  {path:'', component:LoginComponent},
  {path:'register',component:RegisterComponent},
  //user routes
  {
    path:'user',
    component:UserlayoutComponent,
    children: [{
        path: 'dashboard',component:UserDashboard
    }]
  },
  //admin routes
  {
    path:'admin/dashboard',
    component:AdminDashboard
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
