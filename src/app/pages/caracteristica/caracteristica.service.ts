import { Injectable } from '@angular/core';

import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { Caracteristica } from './caracteristica';
import { URL_GLOBAL } from 'src/app/config';
import { HEADERS_GLOBAL } from 'src/app/headers';

@Injectable({
  providedIn: 'root'
})
export class CaracteristicaService {

  // private urlEndPoint: string = "http://localhost:9999/api/caracteristica";
  // private urlEndPoint: string = "http://10.150.10.23:9003/api/caracteristica";
  // private urlEndPoint: string = "/api/caracteristica";
  private urlEndPoint: string = URL_GLOBAL+"/caracteristica";

  // DESARROLLO
  // private httpHeaders = new HttpHeaders({'Content-Type': 'application/json'});
  // END DESARROLLO

  // PRODUCCION
  // private httpHeaders = new HttpHeaders({
  //   'Authorization': 'Bearer '+sessionStorage.access_token
  // });
  // END PRODUCCION


  constructor(private http: HttpClient) { }

  create(caracterisitica:Caracteristica): Observable<Caracteristica>{
    const headersGLOBAL = HEADERS_GLOBAL;
    return this.http.post<Caracteristica>(this.urlEndPoint+"/", caracterisitica,{headers: headersGLOBAL})
  }

  agregaJson(data:String){
    const headersGLOBAL = HEADERS_GLOBAL;
    return this.http.post(this.urlEndPoint+"/agregaJson", data,{headers: headersGLOBAL})
    //return this.http.post(this.urlEndPoint+"/agregaJson?idactivo=${encodeURIComponent(idactivo)}", data,{headers: this.httpHeaders})
  }

  getCaracteristicasByIdActivo(idactivo:String){
    const headersGLOBAL = HEADERS_GLOBAL;
    return this.http.get<Caracteristica[]>(`${this.urlEndPoint}/getCaracteristicasByIdActivo/${idactivo}`, { headers: headersGLOBAL })
  }
}
