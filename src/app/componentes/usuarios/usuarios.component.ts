import { UserService } from 'src/app/service/user.service';
import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css'],
})
export class UsuariosComponent implements OnInit {
  public usuarios!: any;
  constructor(private userService: UserService) {}
  ngOnInit(): void {
    this.userService.get_users().subscribe((response) => {
      this.usuarios = response.usuarios;
      console.log(response.usuarios);
    });
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
        this.userService.eliminar(id).subscribe((response) => {
          this.usuarios = response.usuario;
          console.log('se ha eliminado correctamente el usuario');
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
