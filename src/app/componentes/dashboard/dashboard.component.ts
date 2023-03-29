import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  public identity: string
  constructor(
    private router : Router,
    private userService : UserService
  ){
    this.identity = this.userService.getIdentity();
  }
  
  ngOnInit() {
    if (this.identity) {
      console.log('bien')
      console.log(this.identity)
    } else {
      this.router.navigate(['']);
      console.log("error")
    }
  }

}
