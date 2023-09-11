import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { Ufv } from './ufv';

import { URL_GLOBAL } from 'src/app/config';
import { HEADERS_GLOBAL } from 'src/app/headers';

@Injectable({
  providedIn: 'root'
})
export class UfvService {

  // private urlEndPoint: string = "http://localhost:9999/api/ufv";
  // private urlEndPoint: string = "http://10.150.10.23:9003/api/ufv";
  // private urlEndPoint: string = "api/ufv";
  private urlEndPoint: string = URL_GLOBAL+"/ufv";

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

  getUfvByFecha(fecha:string):Observable<Ufv>{
    const headersGLOBAL = HEADERS_GLOBAL;
    return this.http.get<Ufv>(`${this.urlEndPoint}/${fecha}`, { headers: headersGLOBAL })

    // return this.http.get<Ufv>(`${this.urlEndPoint}/${fecha}`, { headers: this.httpHeaders })
  }
}
