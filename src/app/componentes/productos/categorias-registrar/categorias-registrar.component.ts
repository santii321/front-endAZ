import { Categorias } from './../../../models/Categorias';
import { Component, OnInit } from '@angular/core';
import { ProductoService } from 'src/app/service/producto.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-categorias-registrar',
  templateUrl: './categorias-registrar.component.html',
  styleUrls: ['./categorias-registrar.component.css']
})
export class CategoriasRegistrarComponent implements OnInit {
  public categorias;
  constructor(
    private productoService: ProductoService,
  ) {
    this.categorias = new Categorias('','','')
  }
  ngOnInit() {
    this.productoService.get_categorias().subscribe(
      response=>{
        this.categorias = response.categorias
        console.log(response.categorias)
      }
    )

  }
  save_cat(categoriaForm: { valid: any; value: { titulo: any; descripcion: any; }; }) {
    if (categoriaForm.valid) {
      this.productoService.insert_categoria({
        titulo: categoriaForm.value.titulo,
        descripcion: categoriaForm.value.descripcion,
      }).subscribe((response: any) => {
        this.productoService.get_categorias().subscribe(
          (response: { categorias: any; }) => {
            this.categorias = response.categorias;
            console.log("categorias actualizadas")
            this.ngOnInit()
            Swal.fire({
              title: 'Exelente',
              text: 'Se agrego la Categoria '+categoriaForm.value.titulo,
              icon: 'success'
            })
          });
      })
    }else{
      const messege_error = "No se puede crear esta categoria"
      Swal.fire({
        title: 'Oops...',
        text: messege_error,
        icon: 'error'
      })
    }
  }
}
