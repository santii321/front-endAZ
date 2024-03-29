import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { FacturaService } from 'src/app/service/factura.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-facturas',
  templateUrl: './facturas.component.html',
  styleUrls: ['./facturas.component.css'],
})
export class FacturasComponent implements OnInit {
  public ventas: any;

  constructor(private facturaService: FacturaService) {}
  ngOnInit(): void {
    this.facturaService.get_factura().subscribe((response) => {
      this.ventas = response.ventas;
      console.log(response.ventas);
    });
  }
  eliminar(id: string) {
    Swal.fire({
      title: 'Estas seguro de eliminarlo?',
      text: 'Si la eliminas no podras recuperar esta factura!',
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
        this.facturaService.eliminar(id).subscribe((response) => {
          this.ventas = response.ventas;
        });
        this.ngOnInit();
      } else if (
        /* Read more about handling dismissals below */
        result.dismiss === Swal.DismissReason.cancel
      ) {
        Swal.fire('Cancelado', 'Se cancelo la solicitud :)', 'error');
      }
    });
  }
}
