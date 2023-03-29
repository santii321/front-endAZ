import { NgSelectModule } from '@ng-select/ng-select';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './componentes/login/login.component';
import { HeaderComponent } from './componentes/header/header.component';
import { DashboardComponent } from './componentes/dashboard/dashboard.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { ContenidoComponent } from './componentes/dashboard/contenido/contenido.component';
import { ErrorComponent } from './componentes/error/error.component';
import { ProductosComponent } from './componentes/productos/productos.component';
import { ContenidoProductosComponent } from './componentes/productos/contenido-productos/contenido-productos.component';
import { TablaProductosComponent } from './componentes/productos/tabla-productos/tabla-productos.component';
import {NgxExtendedPdfViewerModule} from 'ngx-extended-pdf-viewer';
import { RegistrarProductosComponent } from './componentes/productos/registrar-productos/registrar-productos.component';
import { NewProductoComponent } from './componentes/productos/registrar-productos/new-producto/new-producto.component';
import { CategoriasComponent } from './componentes/productos/categorias/categorias.component';
import { CategoriasRegistrarComponent } from './componentes/productos/categorias-registrar/categorias-registrar.component';
import { EditarCategoriasComponent } from './componentes/productos/editar-categorias/editar-categorias.component';
import { FacturasComponent } from './componentes/facturas/facturas.component';
import { NuevaFacturaComponent } from './componentes/facturas/nueva-factura/nueva-factura.component';
import { ComponenteFacturacionComponent } from './componentes/facturas/nueva-factura/componente-facturacion/componente-facturacion.component';
import { DetallesFacturaComponent } from './componentes/facturas/detalles-factura/detalles-factura.component';
import { NgxPrintModule } from 'ngx-print';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';
import { MatSelectModule } from '@angular/material/select';
import { MatAutocompleteModule} from "@angular/material/autocomplete"
import { MatInputModule }from "@angular/material/input";
import { MatFormFieldModule } from '@angular/material/form-field';
import { ClientesComponent } from './componentes/clientes/clientes.component';
import { NuevoClienteComponent } from './componentes/clientes/nuevo-cliente/nuevo-cliente.component';
import { UsuariosComponent } from './componentes/usuarios/usuarios.component';
import { NuevoUsuarioComponent } from './componentes/usuarios/nuevo-usuario/nuevo-usuario.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HeaderComponent,
    DashboardComponent,
    ContenidoComponent,
    ErrorComponent,
    ProductosComponent,
    ContenidoProductosComponent,
    TablaProductosComponent,
    RegistrarProductosComponent,
    NewProductoComponent,
    CategoriasComponent,
    CategoriasRegistrarComponent,
    EditarCategoriasComponent,
    FacturasComponent,
    NuevaFacturaComponent,
    ComponenteFacturacionComponent,
    DetallesFacturaComponent,
    ClientesComponent,
    NuevoClienteComponent,
    UsuariosComponent,
    NuevoUsuarioComponent,    



  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    MatSlideToggleModule,
    NgxExtendedPdfViewerModule,
    NgxPrintModule,
    MatSelectModule,
    NgxMatSelectSearchModule,
    FormsModule,
    MatAutocompleteModule,
    MatFormFieldModule,
    MatInputModule,
    NgSelectModule, 
    FormsModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
