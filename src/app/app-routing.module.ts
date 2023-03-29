import { ClientesComponent } from './componentes/clientes/clientes.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './componentes/dashboard/dashboard.component';
import { ErrorComponent } from './componentes/error/error.component';
import { DetallesFacturaComponent } from './componentes/facturas/detalles-factura/detalles-factura.component';
import { FacturasComponent } from './componentes/facturas/facturas.component';
import { NuevaFacturaComponent } from './componentes/facturas/nueva-factura/nueva-factura.component';
import { LoginComponent } from './componentes/login/login.component';
import { EditarCategoriasComponent } from './componentes/productos/editar-categorias/editar-categorias.component';
import { ProductosComponent } from './componentes/productos/productos.component';
import { RegistrarProductosComponent } from './componentes/productos/registrar-productos/registrar-productos.component';
import { UsuariosComponent } from './componentes/usuarios/usuarios.component';

const routes: Routes = [

  {path: '', component: LoginComponent},
  {path: 'dashboard', component: DashboardComponent},
  {path: 'productos', component: ProductosComponent},
  {path: 'nuevoProducto', component: RegistrarProductosComponent},
  {path: 'editarProducto/:id', component: EditarCategoriasComponent},
  {path: 'nuevaFactura',  component: NuevaFacturaComponent},
  {path: 'facturas', component: FacturasComponent},
  {path: 'clientes', component: ClientesComponent},
  {path: 'usuarios', component: UsuariosComponent},
  {path: 'detalleFactura/:id',  component: DetallesFacturaComponent},
  {path: '**', component: ErrorComponent},
  
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes) ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
