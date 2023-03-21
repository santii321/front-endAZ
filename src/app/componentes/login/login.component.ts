import { User } from './../../models/User';
import { UserService } from './../../service/user.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import 'flowbite';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public user;
  public token!: string
  public identity!: string;
  public data_error!: string;

  constructor(
    private userService : UserService,
    private router : Router
  ){
    this.user = new User('','','','','');

  }

  ngOnInit() {
    this.token = localStorage.getItem('token')!;
    this.identity = localStorage.getItem('identity')!;
    if(this.token && this.identity){
      this.router.navigate(['/dashboard']);
    }
  }

  close_alert(){
    this.data_error = ''; 
  }

  login(loginForm: { valid: any; }){
    if(loginForm.valid){
      
      this.userService.login(this.user).subscribe(
        response =>{
          
          this.token = response.jwt;
          localStorage.setItem('token',this.token);

          this.userService.login(this.user,true).subscribe(
            response=>{
              localStorage.setItem('identity',JSON.stringify(response.user));
              this.router.navigate(['dashboard']);
              Swal.fire({
                icon: 'success',
                title: 'Excelente',
                text: 'Has iniciado sesión correctamente',
                showConfirmButton: false,
                timer: 2000
              })
            },
            error=>{
              console.log(error)
              Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: this.data_error,
              })
            }
          )
        },
        error=>{

          this.data_error = error.error.message;
          console.log(this.data_error)
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: this.data_error,
          })
        }
      );
      
    }else{
      this.data_error = "Por favor llene todos los campos";
      console.log(this.data_error)
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: this.data_error,
      })
    }
  }
}
