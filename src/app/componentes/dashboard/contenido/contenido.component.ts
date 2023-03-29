import { ClientesService } from './../../../service/clientes.service';
import { FacturaService } from 'src/app/service/factura.service';
import { UserService } from 'src/app/service/user.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-contenido',
  templateUrl: './contenido.component.html',
  styleUrls: ['./contenido.component.css'],
})
export class ContenidoComponent implements OnInit {
  public identity!: any;
  public contadorVenta!: any;
  public contadorClientes!: any
  public fecha = new Date()
  constructor(
    private userService: UserService,
    private facturaService: FacturaService,
    private clientesService: ClientesService,
  ) {}
  ngOnInit(): void {
    this.identity = this.userService.getIdentity();
    this.facturaService.contadorVenta().subscribe((response) => {
      this.contadorVenta = response;
    });
    this.clientesService.contadorClientes().subscribe(
      response=>{
        this.contadorClientes = response
      }
    )
  }
}
