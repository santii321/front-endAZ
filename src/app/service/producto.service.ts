import { Global } from './Global';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class ProductoService {

  public url!: string;

  constructor(
    private http: HttpClient,
  ) { 
    this.url = Global.url;
  }
  get_productos(filtro: string):Observable<any>{
    let headers = new HttpHeaders().set('Content-Type','application/json');
    return this.http.get(this.url+'productos/'+filtro,{headers:headers});
  }

  get_categorias():Observable<any>{
    let headers = new HttpHeaders().set('Content-Type','application/json');
    return this.http.get(this.url+'categorias',{headers:headers});
  }

  insert_producto(data: { titulo: string | Blob; descripcion: string | Blob; precio_compra: string | Blob; precio_venta: string | Blob; stock: string | Blob; idcategoria: string | Blob; }){
    const fd = new FormData();
    fd.append('titulo',data.titulo);
    fd.append('descripcion',data.descripcion);
    fd.append('precio_compra',data.precio_compra);
    fd.append('precio_venta',data.precio_venta);
    fd.append('stock',data.stock);
    fd.append('idcategoria',data.idcategoria);

    return this.http.post(this.url + 'producto/registrar',fd);
  }


  get_producto(id: string):Observable<any>{
    let headers = new HttpHeaders().set('Content-Type','application/json');
    return this.http.get(this.url+'producto/'+id,{headers:headers});
  }

  update_producto(data: { titulo: string | Blob; descripcion: string | Blob; imagen: string | Blob; precio_compra: string | Blob; precio_venta: string | Blob; idcategoria: string | Blob; puntos: string | Blob; _id: string; img_name: string; }){
    const fd = new FormData();
    fd.append('titulo',data.titulo);
    fd.append('descripcion',data.descripcion);
    fd.append('imagen',data.imagen);
    fd.append('precio_compra',data.precio_compra);
    fd.append('precio_venta',data.precio_venta);
    fd.append('idcategoria',data.idcategoria);
    fd.append('puntos',data.puntos);

    return this.http.put(this.url + 'producto/editar/'+data._id+'/'+data.img_name,fd);
  }

  insert_categoria(data: any):Observable<any>{
    let headers = new HttpHeaders().set('Content-Type','application/json');
    return this.http.post(this.url+'categoria/registrar',data,{headers:headers});
  }

  delete_producto(id: string):Observable<any>{
    let headers = new HttpHeaders().set('Content-Type','application/json');
    return this.http.delete(this.url+'producto/'+id,{headers:headers});
  }

  stock_producto(data: { _id: string; }):Observable<any>{
    let headers = new HttpHeaders().set('Content-Type','application/json');
    return this.http.put(this.url+'producto/stock/'+data._id,data,{headers:headers});
  }

}
