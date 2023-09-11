import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';

import { Partida } from './partida';

import { Observable } from 'rxjs';

import { URL_GLOBAL } from 'src/app/config';
import { HEADERS_GLOBAL } from 'src/app/headers';

@Injectable({
  providedIn: 'root'
})
export class PartidaService {

  // private urlEndPoint:String = "http://localhost:9999/api/partida";
  // private urlEndPoint:String = "http://10.150.10.23:9003/api/partida";
  // private urlEndPoint:String = "api/partida";
  private urlEndPoint: string = URL_GLOBAL+"/partida";

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

  getPartidas(){
    const headersGLOBAL = HEADERS_GLOBAL;
    return this.http.get<Partida[]>(`${this.urlEndPoint}/listado`, { headers: headersGLOBAL})
    // return this.http.get<Partida[]>(`${this.urlEndPoint}/listado`, { headers: this.httpHeaders})
  }

  getPartida(id:String){
    const headersGLOBAL = HEADERS_GLOBAL;
    return this.http.get<Partida>(`${this.urlEndPoint}/${id}`, { headers: headersGLOBAL})
    // return this.http.get<Partida>(`${this.urlEndPoint}/${id}`)
  }

  createPartida(partida:Partida):Observable<Partida>{
    const headersGLOBAL = HEADERS_GLOBAL;
    return  this.http.post<Partida>(this.urlEndPoint+"/", partida, { headers: headersGLOBAL})
    // return  this.http.post<Partida>(this.urlEndPoint+"/", partida, { headers: this.httpHeaders})
  }

  upDate(partida:Partida):Observable<Partida>{
    const headersGLOBAL = HEADERS_GLOBAL;
    return this.http.put<Partida>(`${this.urlEndPoint}/${partida.idpartida}`,partida,{headers:headersGLOBAL})
    // return this.http.put<Partida>(`${this.urlEndPoint}/${partida.idpartida}`,partida,{headers:this.httpHeaders})
  }

  deletePartida(id:String):Observable<Partida>{
    const headersGLOBAL = HEADERS_GLOBAL;
    return this.http.delete<Partida>(`${this.urlEndPoint}/${id}`, {headers:headersGLOBAL});
    // return this.http.delete<Partida>(`${this.urlEndPoint}/${id}`, {headers:this.httpHeaders});
  }
}
