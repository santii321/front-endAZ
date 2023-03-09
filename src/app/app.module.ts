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


  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    MatSlideToggleModule,
    NgxExtendedPdfViewerModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
