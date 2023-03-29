import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Global } from './Global';

@Injectable({
  providedIn: 'root'
})
export class FacturaService {

  public url;

  constructor(
    private http : HttpClient
  ) { 
    this.url = Global.url;
  }
  get_factura():Observable<any>{
    let headers = new HttpHeaders().set('Content-Type','application/json');
    return this.http.get(this.url+'ventas',{headers:headers});
  }

  save_data(data: any):Observable<any>{
    let headers = new HttpHeaders().set('Content-Type','application/json');
    return this.http.post(this.url+'venta/registrar',data,{headers:headers});
  }

  data_factura(id: string):Observable<any>{
    let headers = new HttpHeaders().set('Content-Type','application/json');
    return this.http.get(this.url+'venta/'+id,{headers:headers});
  }
  eliminar(id: string): Observable <any>{
    let headers = new HttpHeaders().set('Content-Type','application/json')
    return this.http.delete(this.url+'venta/data/'+id,{headers:headers})
  }
  get_venta():Observable<any>{
    let headers = new HttpHeaders().set('Content-Type','application/json');
    return this.http.get(this.url+'ventas/actual',{headers:headers});
  }
  contadorVenta(){
    let headers = new HttpHeaders().set('Content-Type','application/json');
    return this.http.get(this.url+'ventas/contar', {headers:headers})
   }
}
