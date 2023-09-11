import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Regimen } from './regimen';

import { URL_GLOBAL } from 'src/app/config';
import { HEADERS_GLOBAL } from 'src/app/headers';


@Injectable({
  providedIn: 'root'
})

export class RegimenService {

  // private urlEndPoint: string = "http://10.150.10.23:9003/api/regimen";
  // private urlEndPoint: string = "api/regimen";

  private urlEndPoint: string = URL_GLOBAL+"/regimen";

  // DESARROLLO
  // private httpHeaders = new HttpHeaders({'Content-Type': 'application/json'});
  // END DESARROLLO

  // PRODUCCION
  // private httpHeaders = new HttpHeaders({
  //   'Authorization': 'Bearer '+sessionStorage.access_token
  // });
  // END PRODUCCION

  constructor(
    private http: HttpClient
  ) { }

  getRegimenes(){
    const headersGLOBAL = HEADERS_GLOBAL;
    return this.http.get<Regimen[]>(`${this.urlEndPoint}/listado`, { headers: headersGLOBAL })
    // return this.http.get<Regimen[]>(`${this.urlEndPoint}/listado`, { headers: this.httpHeaders })
  }
}
