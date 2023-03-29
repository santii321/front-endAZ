import { info } from './../../../../service/info';
import { Router } from '@angular/router';
import { Detalle } from './../../../../models/Detalle';
import { User } from './../../../../models/User';
import { UserService } from './../../../../service/user.service';
import { Observable } from 'rxjs';
import { ClientesService } from './../../../../service/clientes.service';
import { ProductoService } from './../../../../service/producto.service';
import { FacturaService } from './../../../../service/factura.service';
import { Component, OnInit } from '@angular/core';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-componente-facturacion',
  templateUrl: './componente-facturacion.component.html',
})
export class ComponenteFacturacionComponent implements OnInit {
  public hora = new Date().toLocaleString();
  public identity;
  public ventasActuales!: any;
  public venta: any = {
    idcliente: '',
    descuentoFactura: 0,
  };
  public clientes!: any;
  public productos!: any;
  public total = 0;
  public info!: any;
  public subtotal = 0;
  public desc = 0;
  public producto: any = {
    stock: '--|--',
  };
  public data_detalle: Array<any> = [];
  public detalle: any = {
    idproducto: '',
    descuento: '0',
    cantidad: '0',
  };
  constructor(
    private facturaService: FacturaService,
    private productoService: ProductoService,
    private clientesService: ClientesService,
    private userService: UserService,
    private router: Router
  ) {
    this.identity = this.userService.getIdentity();
    this.info = info
  }
  ngOnInit(): void {
    this.clientesService.get_clientes().subscribe(
      (response) => {
        this.clientes = response.clientes;
        console.log(response.clientes);
        console.log(this.identity);
      },
      (error) => {
        console.log(error);
      }
    );
    this.productoService.get_productos('').subscribe(
      (response) => {
        this.productos = response.productos;
        console.log(response.productos);
      },
      (error) => {
        console.log(error);
      }
    );
    this.facturaService.get_venta().subscribe(
      (response) => {
        this.ventasActuales = response.ventasActuales;
        console.log(response.ventasActuales);
      },
      (error) => {
        console.log(error);
      }
    );
  }
  get_data_producto(id: string) {
    this.productoService.get_producto(id).subscribe(
      (response) => {
        this.producto = response.producto;
      },
      (error) => {}
    );
  }
  save_detalle(detalleForm: {
    valid: any;
    value: {
      descuento: any;
      descripcion: any;
      cantidad: string;
      idproducto: any;
    };
  }) {
    if (detalleForm.valid) {
      if (
        detalleForm.value.cantidad <= this.producto.stock &&
        detalleForm.value.cantidad != '0' &&
        detalleForm.value.cantidad != null
      ) {
        this.data_detalle.push({
          idproducto: detalleForm.value.idproducto,
          descripcion: this.producto.descripcion,
          cantidad: detalleForm.value.cantidad,
          descuento: detalleForm.value.descuento,
          producto: this.producto.titulo,
          precio_venta: this.producto.precio_venta,
        });

        this.detalle = new Detalle('', '', 0, 0);
        (this.producto.stock = '--|--'),
          (this.subtotal =
            this.subtotal +
            parseInt(this.producto.precio_venta) *
              parseInt(detalleForm.value.cantidad) -
            parseInt(detalleForm.value.descuento));

        this.total =
          this.subtotal - this.subtotal * (this.venta.descuentoFactura / 100);
        console.log(this.venta);
      } else if (
        detalleForm.value.cantidad == '0' ||
        detalleForm.value.cantidad === null
      ) {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Ingrese una cantidad',
        });
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'No existe la cantidad suficiente para la venta',
        });
      }
    } else {
      console.log('error');
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Error del sistema',
      });
    }
  }
  onSubmit(ventaForm: {
    valid: any;
    value: {
      descuentoFactura: number;
      idcliente: string;
    };
  }) {
    if (ventaForm.valid) {
      if (ventaForm.value.idcliente != '') {
        let data = {
          idcliente: ventaForm.value.idcliente,
          iduser: this.identity._id,
          detalles: this.data_detalle,
          descuentoFactura: ventaForm.value.descuentoFactura,
        };

        this.facturaService.save_data(data).subscribe(
          (response) => {
            Swal.fire(
              'Factura Agg!',
              'Se registro correctamente la Factura!',
              'success'
            ).then((success) => {
              window.location.reload();
              console.log('correcto');
            });
          },
          (error) => {
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: error,
            });
          }
        );
      } else {
        console.log('error');
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Ingrese el cliente',
        });
      }
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Error del sistema',
      });
    }
  }
  generatePDFAndPrint() {
    const doc = new jsPDF({
      orientation: 'landscape',
      unit: 'mm',
      format: 'A5',
    });
    const DATA = document.getElementById('PDF')
    html2canvas(DATA!)
      .then((canvas) => {
        const imgData = canvas.toDataURL('image/PNG');
        const pageWidth = doc.internal.pageSize.getWidth();
        const pageHeight = doc.internal.pageSize.getHeight();

        doc.addImage(imgData, 'PNG', 0, 0, pageWidth, pageHeight);
        return doc;
      })
      .then((docResult) => {
        const PdfElemento = document.getElementById('clase')!;
        if (PdfElemento) {
          PdfElemento.innerHTML =
            '<iframe src="' +
            doc.output('bloburl') +
            '"class="flex-1 border border-gray-400 border-solid rounded-md"> </iframe>';

          console.log('esta bien');
        }
      });
  }
}
