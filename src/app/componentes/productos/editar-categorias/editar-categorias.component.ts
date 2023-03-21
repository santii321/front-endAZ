import { Observable } from 'rxjs';
import { Producto } from './../../../models/Producto';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductoService } from 'src/app/service/producto.service';
import 'flowbite';
import Swal from 'sweetalert2';


type ProductoType={
  descripcion: string
  idcategoria: string
  precio_compra: number
  precio_venta: number
  stock: number
  titulo:string
  __v: number
  _id: string
}
type CategoriasType = {
  titulo: string
  _id: string
}
@Component({
  selector: 'app-editar-categorias',
  templateUrl: './editar-categorias.component.html',
  styleUrls: ['./editar-categorias.component.css']
})
export class EditarCategoriasComponent implements OnInit {

  public producto!: ProductoType
  public id!: string;
  public categorias!: Array<CategoriasType>
  success_message!: string;
  error_message!: string;

  constructor(
    private router: ActivatedRoute,
    private productoService: ProductoService,
    private routers: Router
  ) {

  }
  ngOnInit() {
    this.router.params.subscribe(
      params => {
        this.id = params['id'];
        this.productoService.get_producto(this.id).subscribe(
          response => {
            this.producto = response.producto
            console.log(response.producto)
            this.productoService.get_categorias().subscribe(
              response =>{
                this.categorias = response.categorias
                console.log(response.categorias)
              }
            )
          }
        )
      })
  }
  onSubmit(productoForm: { value: { descripcion: string; precio_compra: string; precio_venta: string; idcategoria: string; stock: string; }; }) {
    if(productoForm.value){
      this.productoService.update_producto({
        _id: this.id,
        descripcion: productoForm.value.descripcion,
        precio_compra: productoForm.value.precio_compra,
        precio_venta: productoForm.value.precio_venta,
        idcategoria: productoForm.value.idcategoria,
        stock: productoForm.value.stock,
      }).subscribe(
        response=>{
          console.log(response);
          this.success_message = 'Se actualizó el producto correctamente';
          Swal.fire({
            title: 'Exelente',
            text: this.success_message,
            icon: 'success'
          }).then(() => {
            window.location.href = '/productos';
          });
        },
        error=>{
          Swal.fire({
            title: 'Oops...',
            text: error,
            icon: 'error'
          })
        }
      );
      
    }else{
      this.error_message = 'Complete correctamente el formulario';
      Swal.fire({
        title: 'Oops...',
        text: this.error_message,
        icon: 'error'
      })
    }
  }

  
}
