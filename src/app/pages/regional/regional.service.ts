import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Regional } from './regional';

import { URL_GLOBAL } from 'src/app/config';
import { HEADERS_GLOBAL } from 'src/app/headers';

@Injectable({
  providedIn: 'root'
})
export class RegionalService {

  // private urlEndPoint: string = "http://localhost:9999/api/regional";
  // private urlEndPoint: string = "http://10.150.10.23:9003/api/regional";
  // private urlEndPoint: string = "api/regional";
  private urlEndPoint: string = URL_GLOBAL+"/regional";

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

  getRegionales(){
    const headersGLOBAL = HEADERS_GLOBAL;
    return this.http.get<Regional[]>(`${this.urlEndPoint}/listado`, { headers: headersGLOBAL })
    // return this.http.get<Regional[]>(`${this.urlEndPoint}/listado`, { headers: this.httpHeaders })
  }
}
