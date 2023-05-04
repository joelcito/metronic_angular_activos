import { Injectable } from '@angular/core';

import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { Caracteristica } from './caracteristica';

@Injectable({
  providedIn: 'root'
})
export class CaracteristicaService {

  // private urlEndPoint: string = "http://localhost:9999/api/caracteristica";
  // private urlEndPoint: string = "http://10.150.10.23:9003/api/caracteristica";
  private urlEndPoint: string = "/api/caracteristica";
  private httpHeaders = new HttpHeaders({'Content-Type': 'application/json'});

  constructor(private http: HttpClient) { }

  create(caracterisitica:Caracteristica): Observable<Caracteristica>{
    return this.http.post<Caracteristica>(this.urlEndPoint+"/", caracterisitica,{headers: this.httpHeaders})
  }

  agregaJson(data:String){
    return this.http.post(this.urlEndPoint+"/agregaJson", data,{headers: this.httpHeaders})
    //return this.http.post(this.urlEndPoint+"/agregaJson?idactivo=${encodeURIComponent(idactivo)}", data,{headers: this.httpHeaders})
  }

  getCaracteristicasByIdActivo(idactivo:String){
    return this.http.get<Caracteristica[]>(`${this.urlEndPoint}/getCaracteristicasByIdActivo/${idactivo}`)
  }
}
