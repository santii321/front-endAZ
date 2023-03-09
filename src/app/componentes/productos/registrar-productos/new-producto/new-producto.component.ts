import { Observable } from 'rxjs';
import { Producto } from './../../../../models/Producto';
import { Component, OnInit } from '@angular/core';
import { ProductoService } from 'src/app/service/producto.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-new-producto',
  templateUrl: './new-producto.component.html',
  styleUrls: ['./new-producto.component.css']
})
export class NewProductoComponent implements OnInit {

  public producto;
  public categorias!: Iterable<any>;
  public success_message!: string;
  public error_message!: string;
  constructor(
    private produtoService : ProductoService,
  ){
    this.producto = new Producto('','','',1,1,1,'');

  }

  ngOnInit() {
    this.produtoService.get_categorias().subscribe(
      response =>{
        this.categorias = response.categorias;
        console.log(response.categorias)
      }
    )
  }
  onSubmit(productoForm: { valid: any; value: { titulo: any; descripcion: any; precio_compra: any; precio_venta: any; stock: any; idcategoria: any; }; }){
    if(productoForm.valid){
     this.produtoService.insert_producto({
       titulo: productoForm.value.titulo,
       descripcion: productoForm.value.descripcion,
       precio_compra: productoForm.value.precio_compra,
       precio_venta: productoForm.value.precio_venta,
       stock: productoForm.value.stock,
       idcategoria: productoForm.value.idcategoria,
       
     }).subscribe(
       ( response: any) =>{
        this.success_message = 'Se registro el producto correctamente';
        this.producto = new Producto('','','',1,1,1,'');
        console.log(this.success_message)
        Swal.fire({
          title: 'Exelente',
          text: this.success_message,
          icon: 'success'
        })
       },
       error=>{
        const mensaje = error.error.message
         console.log(error.error)
         Swal.fire({
          title: 'Oops...',
          text: JSON.stringify(mensaje),
          icon: 'error'
        })
       }
     );
      
    }else{
      this.error_message = 'Complete correctamente el formulario';
      console.log(this.error_message)
      Swal.fire({
        title: 'Oops...',
        text: this.error_message,
        icon: 'error'
      })
    }
    
  }
}
