import { Observable } from 'rxjs';
import { Categorias } from './../../../models/Categorias';
import { Component, OnInit } from '@angular/core';
import { ProductoService } from 'src/app/service/producto.service';
import Swal from 'sweetalert2';
type CategoriasType = {
  _id: String
  titulo: String
  descripcion: String
}
@Component({
  selector: 'app-categorias',
  templateUrl: './categorias.component.html',
  styleUrls: ['./categorias.component.css']
})
export class CategoriasComponent implements OnInit {


  public categorias!: Array<CategoriasType>;
  constructor(
    private productoService: ProductoService,
  ) {

  }
  ngOnInit(): void {
    this.productoService.get_categorias().subscribe(
      response => {
        this.categorias = response.categorias,
          console.log(response.categorias)
      }
    )
  }
  eliminar_categoria(id: any) {
    Swal.fire({
      title: 'Estas seguro de eliminarlo?',
      text: "Eliminación!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Eliminar!',
      cancelButtonText: 'No, cancelar!',
      reverseButtons: true
    }).then((result) => {
      if (result.value) {
        Swal.fire(
          'Registro eliminado!',
          'Se elimino correctamente.',
          'success'
        )
        this.productoService.delete_categoria(id).subscribe(
          response => {
            this.categorias = response.categorias,
              console.log("se elimino")
            this.ngOnInit()
          });
      } else if (
        /* Read more about handling dismissals below */
        result.dismiss === Swal.DismissReason.cancel
      ) {
        Swal.fire(
          'Cancelado',
          'Se cancelo la solicitud :)',
          'error'
        )
      }
    })
  }
}
