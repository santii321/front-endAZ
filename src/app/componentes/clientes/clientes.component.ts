import { ClientesService } from './../../service/clientes.service';
import { OnInit } from '@angular/core';
import { Component } from '@angular/core';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.css']
})
export class ClientesComponent  implements OnInit{

  public clientes!: Array<any>
  
  constructor(
    private clientesService : ClientesService
  ){

  }

  ngOnInit(): void {
    this.clientesService.get_clientes().subscribe(
      response =>{
        this.clientes = response.clientes
        console.log(response.clientes)
      }
    )
  }
  eliminar(id: string) {
    Swal.fire({
      title: 'Estas seguro de eliminarlo?',
      text: 'Eliminación!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Eliminar!',
      cancelButtonText: 'No, cancelar!',
      reverseButtons: true,
    }).then((result) => {
      if (result.value) {
        Swal.fire(
          'Registro eliminado!',
          'Se elimino correctamente.',
          'success'
        );
        this.clientesService.eliminar(id).subscribe((response) => {
          this.clientes = response.usuario;
          console.log('se ha eliminado correctamente el cliente');
          this.ngOnInit();
        });
      } else if (
        /* Read more about handling dismissals below */
        result.dismiss === Swal.DismissReason.cancel
      ) {
        Swal.fire('Cancelado', 'Se cancelo la solicitud :)', 'error');
      }
    });
  }

}
