import { Router } from '@angular/router';
import { UserService } from './../../service/user.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  public identity
  public token
  constructor(
    private userService : UserService,
    private router : Router,
  ){
    this.identity = this.userService.getIdentity()
    this.token = this.userService.getToken()
  }
  ngOnInit(): void {
    
    
  }
  logout(){
    localStorage.removeItem('identity');
    localStorage.removeItem('token');

    this.identity = null;
    this.token = null;

    this.router.navigate(['']);
  }
}
