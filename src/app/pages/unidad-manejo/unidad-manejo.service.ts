import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UnidadManejo } from './unidad-manejo';
import { URL_GLOBAL } from 'src/app/config';
import { HEADERS_GLOBAL } from 'src/app/headers';

@Injectable({
  providedIn: 'root'
})
export class UnidadManejoService {

  // private urlEndPoint: string = "http://localhost:9999/api/unidadManejo";
  // private urlEndPoint: string = "http://10.150.10.23:9003/api/unidadManejo";
  // private urlEndPoint: string = "api/unidadManejo";
  private urlEndPoint: string = URL_GLOBAL+"/unidadManejo";

  // DESARROLLO
  // private httpHeaders = new HttpHeaders({
  //   'Content-Type': 'application/json'
  // });
  // END DESARROLLO
  
  // PRODUCCION
  // private httpHeaders = new HttpHeaders({
  //   'Authorization': 'Bearer '+sessionStorage.access_token
  // });
  // END PRODUCCION

  constructor(
    private http: HttpClient
  ) { }

  getUnidadManejos(){
    const headersGLOBAL = HEADERS_GLOBAL;
    // return this.http.get<UnidadManejo[]>(`${this.urlEndPoint}/listado`, { headers: this.httpHeaders })
    return this.http.get<UnidadManejo[]>(`${this.urlEndPoint}/listado`, { headers: headersGLOBAL })
  }
}
