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
}
