import { User } from './../../../models/User';
import { Component, OnInit } from '@angular/core';
import { UserService } from '@services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-nuevo-usuario',
  templateUrl: './nuevo-usuario.component.html',
  styleUrls: ['./nuevo-usuario.component.css'],
})
export class NuevoUsuarioComponent implements OnInit {
  public usuario!: any;
  constructor(private userService: UserService) {
    this.usuario = new User('', '', '', '', '');
  }
  ngOnInit(): void {}

  onSubmit(usuarioForm: {
    valid: any;
    value: { email: any; nombres: any; password: any; role: any };
  }) {
    if (usuarioForm.valid) {
      this.userService
        .registrar({
          email: usuarioForm.value.email,
          nombres: usuarioForm.value.nombres,
          password: usuarioForm.value.password,
          role: usuarioForm.value.role,
        })
        .subscribe(
          (response) => {
            Swal.fire(
              'Excelente!',
              'Usuario creado con exito!',
              'success'
            ).then((succes)=>{
              window.location.reload()
            })
            console.log(response);
          },
          (res) => {
            Swal.fire({
              icon: 'error',
              html: `<span class="font-bold text-xl">${res.error}</span>`,
            });
            console.log(res.error, 'error');
          }
        );
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Por favor llene todos los campos',
      });
      console.log('hay un error');
    }
  }
}
