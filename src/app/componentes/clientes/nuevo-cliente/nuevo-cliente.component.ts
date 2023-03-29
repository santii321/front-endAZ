import { Router } from '@angular/router';
import { ClientesService } from './../../../service/clientes.service';
import { Component, OnInit } from '@angular/core';
import { Cliente } from '@models/Cliente';
import { NgForm } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-nuevo-cliente',
  templateUrl: './nuevo-cliente.component.html',
  styleUrls: ['./nuevo-cliente.component.css']
})
export class NuevoClienteComponent implements OnInit {
  public cliente!:any
  constructor(
    private clientesService : ClientesService,
    private router : Router
  ){
    this.cliente =  new Cliente ('','','','')
  }
  ngOnInit(): void {
    
  }

  onSubmit(clienteForm: NgForm){
    if(clienteForm.valid){
      this.clientesService.insert_cliente({
        nombres: clienteForm.value.nombres,
        dni : clienteForm.value.dni,
        correo: clienteForm.value.correo
      }).subscribe(
        response =>{
          Swal.fire({
            icon: 'success',
            title: 'Excelente!',
            text: 'Cliente agregado correctamente',
          }).then((success) => {
            window.location.reload();
            console.log('correcto');
          });
        },
        error=>{
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'El numero de identificación ya se encuentra registrado en el sistema',
          })
          console.log("malo")
        }
        
      )
    }else{
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Ingrese datos Validos',
      })
      console.log("dkdk")
    }
  }

}
