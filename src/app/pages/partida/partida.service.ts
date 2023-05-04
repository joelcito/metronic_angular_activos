import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';

import { Partida } from './partida';

import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PartidaService {

  // private urlEndPoint:String = "http://localhost:9999/api/partida";
  // private urlEndPoint:String = "http://10.150.10.23:9003/api/partida";
  private urlEndPoint:String = "api/partida";
  private httpHeaders = new HttpHeaders({'Content-Type': 'application/json'});

  constructor(
    private http:HttpClient
  ) { }

  getPartidas(){
    return this.http.get<Partida[]>(`${this.urlEndPoint}/listado`)
  }

  getPartida(id:String){
    return this.http.get<Partida>(`${this.urlEndPoint}/${id}`)
  }

  createPartida(partida:Partida):Observable<Partida>{
    return  this.http.post<Partida>(this.urlEndPoint+"/", partida, { headers: this.httpHeaders})
  }

  upDate(partida:Partida):Observable<Partida>{
    return this.http.put<Partida>(`${this.urlEndPoint}/${partida.idpartida}`,partida,{headers:this.httpHeaders})
  }

  deletePartida(id:String):Observable<Partida>{
    return this.http.delete<Partida>(`${this.urlEndPoint}/${id}`, {headers:this.httpHeaders});
  }
}
