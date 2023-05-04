import { Injectable } from '@angular/core';

import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Grupo } from './grupo';
import { map, tap } from 'rxjs/operators';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GrupoService {

  // private urlEndPoint:String = "http://localhost:9999/api/grupo";
  // private urlEndPointExterno:String = "http://localhost:9999/api/externo";
  
  // private urlEndPoint:String = "http://10.150.10.23:9003/api/grupo";
  private urlEndPoint:String = "api/grupo";
  private urlEndPointExterno:String = "http://10.150.10.23:9003/api/externo";

  private httpHeaders = new HttpHeaders({
    'Content-Type': 'application/json',
    // 'Access-Control-Allow-Origin': 'http://10.150.10.13'
  });

  constructor(
    private http:HttpClient
  ) { }

  getGrupos(){
  // getGrupos():Observable<Grupo[]>{
  // getGrupos():Observable<Grupo[]>{
    // return this.http.get(`${this.urlEndPoint}/listado`).pipe(
    // )
    return this.http.get<Grupo[]>(`${this.urlEndPoint}/listado`)

    // return this.http.get<Grupo[]>(`${this.urlEndPoint}/listado`)
  }

  crearGrupo(grupo: Grupo):Observable<Grupo>{
    return this.http.post<Grupo>(this.urlEndPoint+"/", grupo, { headers: this.httpHeaders})
  }

  // deleteGrupo(id:String):Observable<Grupo>{
  //   return this.http.delete<Grupo>(this.urlEndPoint+"/"+id, {headers:this.httpHeaders});
  // }

  deleteGrupo(id:String):Observable<Grupo>{
    return this.http.delete<Grupo>(this.urlEndPoint+"/"+id, {headers:this.httpHeaders});
  }

  upDate(grupo:Grupo):Observable<Grupo>{
    return this.http.put<Grupo>(`${this.urlEndPoint}/${grupo.idgrupo}`,grupo,{headers:this.httpHeaders})
  }

  getGrupoById(idgrupo:String){
    return this.http.get<Grupo>(`${this.urlEndPoint}/${idgrupo}`)
  }

  getCuentaPartidaByIdGrupo(idgrupo:String){
    return this.http.get<any>(`${this.urlEndPointExterno}/getCuentaPartidaByIdGrupo/${idgrupo}`, {headers:this.httpHeaders})
  }
}
