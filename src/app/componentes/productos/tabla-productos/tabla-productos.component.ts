import { NgxExtendedPdfViewerModule } from 'ngx-extended-pdf-viewer';
import { Component, OnInit } from '@angular/core';
import { Global } from 'src/app/service/Global';
import { ProductoService } from 'src/app/service/producto.service';
import Swal from 'sweetalert2';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable'

import html2canvas from 'html2canvas';


type ProductType = {
  descripcion: string
  idcategoria: {
    descripcion: string,
    titulo: string,
    _v: number,
    _id: string
  },
  precio_compra: number
  precio_venta: number
  puntos: number
  stock: number
  titulo: string
  _v: number
  _id: string
}

@Component({
  selector: 'app-tabla-productos',
  templateUrl: './tabla-productos.component.html',
  styleUrls: ['./tabla-productos.component.css']
})
export class TablaProductosComponent implements OnInit {

  public productos!: Array<ProductType>;
  public url!: string;
  public filtro!: string;
  public categorias!: string;
  public titulo_cat!: string;
  public descripcion_cat!: string;
  public producto_stock!: string;
  public producto_id!: string;
  public success_message!: string;
  public filtroText!: string;

  constructor(
    private productoService: ProductoService
  ) {
    this.url = Global.url
  }

  ngOnInit(): void {

    this.productoService.get_productos('').subscribe(
      response => {
        this.productos = response.productos;
        console.log(response.productos)
      }
    )
  }
  search(searchForm: { value: { filtro: string; }; }) {
    this.productoService.get_productos(searchForm.value.filtro).subscribe(
      response => {
        this.productos = response.productos;
      });
  }
  eliminar(id: string) {
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
        this.productoService.delete_producto(id).subscribe(
          response => {
            this.productos = response.productos;
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
  downloadPDF() {
    const DATA = document.getElementById('PDN');
    const doc = new jsPDF('p', 'pt', 'a4');
    const options = {
      background: 'white',
      scale: 3
    };
    html2canvas(DATA!, options).then((canvas) => {
      
      autoTable(doc, {
        head: [['PRODUCTO REF', 'DESCRIPCIÓN', 'CANTIDAD', 'PRECIO UNITARIO']],
        body: this.productos.map(p => [p.titulo, p.descripcion,p.stock, p.precio_venta.toLocaleString('es-CO')])
      });
      return doc;
    }).then((docResult) => {
      // Agregar el PDF al contenedor
      const pdnElement = document.getElementById('clase')!;
      if (pdnElement) {
        pdnElement.innerHTML = '<iframe src="' + doc.output('datauristring') + '"class="flex-1 border border-gray-400 border-solid rounded-md"></iframe>';
        console.log(this.productos)
      }
    });
  }
}


