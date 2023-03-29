import { Observable } from 'rxjs';
import { Global } from './Global';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ClientesService {

  public url
  constructor(
   private http: HttpClient
  ) { 
    this.url = Global.url
  }
  get_clientes():Observable<any>{
    let headers = new HttpHeaders().set('Content-Type','application/json');
    return this.http.get(this.url+'clientes', {headers:headers})
  }
  get_cliente(id: string):Observable<any>{
    let headers = new HttpHeaders().set('Content-Type','application/json');
    return this.http.get(this.url+'cliente/'+id,{headers:headers})
  }
  insert_cliente(data: any):Observable<any>{
    let headers = new HttpHeaders().set('Content-Type','application/json');
    return this.http.post(this.url+'cliente/registrar',data,{headers:headers});
  }
  eliminar(id: string): Observable<any>{
    let headers= new HttpHeaders().set('Content-Type','application/json');
    return this.http.delete(this.url+'cliente/eliminar/'+id, {headers:headers})
  }
  contadorClientes(){
    let headers = new HttpHeaders().set('Content-Type','application/json');
    return this.http.get(this.url+'clientes/contardor', {headers:headers})
   }
}
