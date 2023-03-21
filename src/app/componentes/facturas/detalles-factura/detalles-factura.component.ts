import { info } from './../../../service/info';
import { ActivatedRoute } from '@angular/router';
import { FacturaService } from './../../../service/factura.service';
import { Component, OnInit } from '@angular/core';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

@Component({
  selector: 'app-detalles-factura',
  templateUrl: './detalles-factura.component.html',
  styleUrls: ['./detalles-factura.component.css'],
})
export class DetallesFacturaComponent implements OnInit {
  public venta: any;
  public id!: string;
  public detalle_venta!: any;
  public subTotal = 0;
  public total = 0;
  public info!: any;
  constructor(
    private facturaService: FacturaService,
    private route: ActivatedRoute
  ) {
    this.info = info;
  }
  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.id = params['id'];

      this.facturaService.data_factura(this.id).subscribe(
        (response) => {
          this.venta = response.data.venta;
          this.detalle_venta = response.data.detalles;

          for (let item of this.detalle_venta) {
            this.subTotal += item.idproducto.precio_venta * item.cantidad;
          }
          console.log(this.subTotal);
          console.log(response.data.detalles);
        },
        (error) => {
          console.log(error);
        }
      );
    });
  }
  generatePDFAndPrint() {
    const doc = new jsPDF({
      orientation: 'landscape',
      unit: 'mm',
      format: 'A5',
    });
    const DATA = document.getElementById('PDF');
    html2canvas(DATA!).then((canvas) => {
        const imgData = canvas.toDataURL('image/gif');
        const pageWidth = doc.internal.pageSize.getWidth();
        const pageHeight = doc.internal.pageSize.getHeight();

        doc.addImage(imgData, 'GIF', 0, 0, pageWidth, pageHeight);
       return doc
      })
      .then((docResult) => {
        const PdfElemento = document.getElementById('clase')!;
        if (PdfElemento) {
          PdfElemento.innerHTML =
            '<iframe src="' +
            doc.output('bloburl') +
            '"class="flex-1 border border-gray-400 border-solid rounded-md"></iframe>';
            console.log("esta bien")
            
        }
      });
  }
}
