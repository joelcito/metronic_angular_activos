import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Cuenta } from './cuenta';


@Injectable({
  providedIn: 'root'
})
export class CuentaService {

  // private urlEndPoint:String = "http://localhost:9999/api/cuenta";
  // private urlEndPoint:String = "http://10.150.10.23:9003/api/cuenta";
  private urlEndPoint:String = "api/cuenta";
  private httpHeaders = new HttpHeaders({'Content-Type': 'application/json'});

  constructor(
    private http:HttpClient
  ) { }

  getCuentas(){
    return this.http.get<Cuenta[]>(`${this.urlEndPoint}/listado`)
  }

  createCuenta(cuenta:Cuenta):Observable<Cuenta>{
    return  this.http.post<Cuenta>(this.urlEndPoint+"/", cuenta, { headers: this.httpHeaders})
  }

  upDate(cuenta:Cuenta):Observable<Cuenta>{
    return this.http.put<Cuenta>(`${this.urlEndPoint}/${cuenta.idcuenta}`,cuenta,{headers:this.httpHeaders})
  }

  deleteCuenta(id:String):Observable<Cuenta>{
    return this.http.delete<Cuenta>(`${this.urlEndPoint}/${id}`, {headers:this.httpHeaders});
  }

  getCuenta(idCuenta:String){
    return this.http.get<Cuenta>(`${this.urlEndPoint}/${idCuenta}`)
  }
}
