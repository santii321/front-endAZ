import { User } from './../models/User';
import { Global } from './Global';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class UserService {

  public url;
  public user;
  public token: any;
  public identity: unknown;

  constructor(private http: HttpClient) { 
    this.url = Global.url;
    this.user = new User('','','','',''); 
  }

  login(user: any, getToken: boolean = false): Observable<any> {
    let json = user;
    if(getToken){
      json.gettoken = true;
    }

    let headers = new HttpHeaders().set('Content-Type','application/json');
    return this.http.post(this.url + 'login',json,{headers:headers})
  }

  getToken():any{
    let token = localStorage.getItem('token');
    if(token){
      this.token = token;
    }else{
      this.token = null;
    }

    return this.token;
  }

  getIdentity(): any {
    let identity = localStorage.getItem('identity');
    if(identity){
      this.identity = JSON.parse(identity);
    } else {
      this.identity = null;
    }

    return this.identity;
  }

  get_users(): Observable<any> {
    let headers = new HttpHeaders().set('Content-Type','application/json');
    return this.http.get(this.url + 'usuarios',{headers:headers});
  }

  registrar(data: any): Observable<any> {
    let headers = new HttpHeaders().set('Content-Type','application/json');
    return this.http.post(this.url + 'registrar',data,{headers:headers});
  }

  get_user(id: string): Observable<any> {
    let headers = new HttpHeaders().set('Content-Type','application/json');
    return this.http.get(this.url + 'user/'+id,{headers:headers});
  }

  editar(data: { _id: string; }):Observable<any> {
    let headers = new HttpHeaders().set('Content-Type','application/json');
    return this.http.put(this.url + 'user/editar/'+data._id,data,{headers:headers});
  }
  eliminar(id: string): Observable<any>{
    let headers = new HttpHeaders().set('Content-Type','application/json')
    return this.http.delete(this.url +'user/'+id, {headers:headers})
   }

}
