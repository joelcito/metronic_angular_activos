import { Injectable } from '@angular/core';

import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Grupo } from './grupo';
import { map, tap } from 'rxjs/operators';
import { Observable, Subject } from 'rxjs';

import { URL_GLOBAL } from 'src/app/config';
import { HEADERS_GLOBAL } from 'src/app/headers';

@Injectable({
  providedIn: 'root'
})
export class GrupoService {

  // private urlEndPoint:String = "http://localhost:9999/api/grupo";
  // private urlEndPointExterno:String = "http://localhost:9999/api/externo";
  
  // private urlEndPoint:String = "http://10.150.10.23:9003/api/grupo";
  // private urlEndPoint:String = "api/grupo";
  private urlEndPoint: string = URL_GLOBAL+"/grupo";

  // private urlEndPointExterno:String = "http://10.150.10.23:9003/api/externo";
  private urlEndPointExterno:String = URL_GLOBAL+"/externo";

  // DESARROLLO
  // private httpHeaders = new HttpHeaders({'Content-Type': 'application/json'});
  // END DESARROLLO
  
  // PRODUCCION
  // private httpHeaders = new HttpHeaders({
  //   'Authorization': 'Bearer '+sessionStorage.access_token
  // });
  // END PRODUCCION


  constructor(
    private http:HttpClient
  ) { }

  getGrupos(){
    const headersGLOBAL = HEADERS_GLOBAL;
  // getGrupos():Observable<Grupo[]>{
  // getGrupos():Observable<Grupo[]>{
    // return this.http.get(`${this.urlEndPoint}/listado`).pipe(
    // )
    return this.http.get<Grupo[]>(`${this.urlEndPoint}/listado`, { headers: headersGLOBAL })
    // return this.http.get<Grupo[]>(`${this.urlEndPoint}/listado`, { headers: this.httpHeaders })
    // return this.http.get<Grupo[]>(`${this.urlEndPoint}/listado`)
  }

  crearGrupo(grupo: Grupo):Observable<Grupo>{
    const headersGLOBAL = HEADERS_GLOBAL;
    return this.http.post<Grupo>(this.urlEndPoint+"/", grupo, { headers: headersGLOBAL})
    // return this.http.post<Grupo>(this.urlEndPoint+"/", grupo, { headers: this.httpHeaders})
  }

  // deleteGrupo(id:String):Observable<Grupo>{
  //   return this.http.delete<Grupo>(this.urlEndPoint+"/"+id, {headers:this.httpHeaders});
  // }

  deleteGrupo(id:String):Observable<Grupo>{
    const headersGLOBAL = HEADERS_GLOBAL;
    return this.http.delete<Grupo>(this.urlEndPoint+"/"+id, {headers:headersGLOBAL});
    // return this.http.delete<Grupo>(this.urlEndPoint+"/"+id, {headers:this.httpHeaders});
  }

  upDate(grupo:Grupo):Observable<Grupo>{
    const headersGLOBAL = HEADERS_GLOBAL;
    return this.http.put<Grupo>(`${this.urlEndPoint}/${grupo.idgrupo}`,grupo,{headers:headersGLOBAL})
    // return this.http.put<Grupo>(`${this.urlEndPoint}/${grupo.idgrupo}`,grupo,{headers:this.httpHeaders})
  }

  getGrupoById(idgrupo:String){
    const headersGLOBAL = HEADERS_GLOBAL;
    return this.http.get<Grupo>(`${this.urlEndPoint}/${idgrupo}`, {headers:headersGLOBAL})
    // return this.http.get<Grupo>(`${this.urlEndPoint}/${idgrupo}`)
  }

  getCuentaPartidaByIdGrupo(idgrupo:String){
    const headersGLOBAL = HEADERS_GLOBAL;
    return this.http.get<any>(`${this.urlEndPointExterno}/getCuentaPartidaByIdGrupo/${idgrupo}`, {headers:headersGLOBAL})
    // return this.http.get<any>(`${this.urlEndPointExterno}/getCuentaPartidaByIdGrupo/${idgrupo}`, {headers:this.httpHeaders})
  }
}
