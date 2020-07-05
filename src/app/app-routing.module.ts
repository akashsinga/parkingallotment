import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { DashboardComponent as UserDashboard} from './components/user/dashboard/dashboard.component';
import { DashboardComponent as AdminDashboard} from './components/admin/dashboard/dashboard.component';


const routes: Routes = [
{path:'', component:LoginComponent},
{path:'register',component:RegisterComponent},
{path:'user/dashboard',component:UserDashboard},
{path:'admin/dashboard',component:AdminDashboard}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
