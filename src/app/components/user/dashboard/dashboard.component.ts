import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
// import { HeaderComponent } from '../header/HeaderComponent';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  constructor(private router:Router) {
    if(localStorage.length!=0)
    {
      let user=localStorage.getItem('user');
      console.log(JSON.parse(user)['username']);
    }
    else
    {
        this.router.navigate(['']);
    }
   }

  ngOnInit(): void {
  }

}
