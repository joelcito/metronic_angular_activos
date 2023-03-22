import { Injectable } from '@angular/core';

import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Grupo } from './grupo';
import { map, tap } from 'rxjs/operators';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GrupoService {

  private urlEndPoint:String = "http://localhost:9999/api/grupo";
  private httpHeaders = new HttpHeaders({'Content-Type': 'application/json'});

  constructor(
    private http:HttpClient
  ) { }

  getGrupos(){
  // getGrupos():Observable<Grupo[]>{
  // getGrupos():Observable<Grupo[]>{
    // return this.http.get(`${this.urlEndPoint}/listado`).pipe(
    // )
    return this.http.get<Grupo[]>(`${this.urlEndPoint}/listado`)
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

  // upDate(grupo:Grupo):Observable<Grupo>{
  // }
}
