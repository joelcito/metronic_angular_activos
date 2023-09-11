import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Cuenta } from './cuenta';

import { URL_GLOBAL } from 'src/app/config';
import { HEADERS_GLOBAL } from 'src/app/headers';

@Injectable({
  providedIn: 'root'
})
export class CuentaService {

  // private urlEndPoint:String = "http://localhost:9999/api/cuenta";
  // private urlEndPoint:String = "http://10.150.10.23:9003/api/cuenta";
  // private urlEndPoint:String = "api/cuenta";
  private urlEndPoint: string = URL_GLOBAL+"/cuenta";

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

  getCuentas(){
    const headersGLOBAL = HEADERS_GLOBAL;
    return this.http.get<Cuenta[]>(`${this.urlEndPoint}/listado`, { headers: headersGLOBAL})
  }

  createCuenta(cuenta:Cuenta):Observable<Cuenta>{
    const headersGLOBAL = HEADERS_GLOBAL;
    return  this.http.post<Cuenta>(this.urlEndPoint+"/", cuenta, { headers: headersGLOBAL})
  }

  upDate(cuenta:Cuenta):Observable<Cuenta>{
    const headersGLOBAL = HEADERS_GLOBAL;
    return this.http.put<Cuenta>(`${this.urlEndPoint}/${cuenta.idcuenta}`,cuenta,{headers:headersGLOBAL})
  }

  deleteCuenta(id:String):Observable<Cuenta>{
    const headersGLOBAL = HEADERS_GLOBAL;
    return this.http.delete<Cuenta>(`${this.urlEndPoint}/${id}`, {headers:headersGLOBAL});
  }

  getCuenta(idCuenta:String){
    const headersGLOBAL = HEADERS_GLOBAL;
    return this.http.get<Cuenta>(`${this.urlEndPoint}/${idCuenta}`, {headers:headersGLOBAL})
  }
}
