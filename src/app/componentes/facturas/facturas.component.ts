import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { FacturaService } from 'src/app/service/factura.service';

@Component({
  selector: 'app-facturas',
  templateUrl: './facturas.component.html',
  styleUrls: ['./facturas.component.css']
})
export class FacturasComponent implements OnInit {

  public ventas: any

  constructor(
    private facturaService : FacturaService,
  ){

  }
  ngOnInit() {
    this.facturaService.get_factura().subscribe(
      response => {
        this.ventas = response.ventas;
        console.log(response.ventas)
      }
    )
  }

}
