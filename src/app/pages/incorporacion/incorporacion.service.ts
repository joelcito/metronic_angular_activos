import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Incorporacion } from './incorporacion';
import { URL_GLOBAL } from 'src/app/config';
import { HEADERS_GLOBAL } from 'src/app/headers';

@Injectable({
  providedIn: 'root'
})
export class IncorporacionService {

  // private urlEndPoint: string = "http://localhost:9999/api/incorporacion";
  // private urlEndPoint: string = "http://10.150.10.23:9003/api/incorporacion";
  // private urlEndPoint: string = "api/incorporacion";
  private urlEndPoint: string = URL_GLOBAL+"/incorporacion";
   // DESARROLLO
  //  private httpHeaders = new HttpHeaders({'Content-Type': 'application/json'});
   // END DESARROLLO

  // PRODUCCION
  // private httpHeaders = new HttpHeaders({
  //   'Authorization': 'Bearer '+sessionStorage.access_token
  // });
  // END PRODUCCION

  constructor(
    private http: HttpClient
  ) { }

  getIncorporaciones() {
    const headersGLOBAL = HEADERS_GLOBAL;
    // console.log("HOLA JOEL", sessionStorage.access_token)
    // Construye los encabezados con el encabezado de autorización
    // const headers = new HttpHeaders({
    //   'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzZWd1bmRvX2FwZWxsaWRvIjoiUVVJU1BFIiwidXNlcl9uYW1lIjoiamZsb3Jlc3EiLCJzY29wZSI6WyJyZWFkIiwid3JpdGUiXSwiYWNjZXNvX2FjdGl2b3MiOnsiYXJlYSI6IkRJUkVDQ0nDk04gTkFDSU9OQUwgREUgVEVDTk9MT0dJQVMgREUgSU5GT1JNQUNJT04gWSBDT01VTklDQUNJT04gICAgICAgICAgICAgICAgICIsImlkcm9sIjoxODcsInNpZ2xhIjoiUk9MRV9BQ1RBRE0iLCJpZGFyZWEiOiIwMTAzMDAwMDAwIiwiaWRyZXAiOiIwMTAwMDAwMDAwIiwic2lzdGVtYSI6IkFDVElWT1MiLCJyZXBhcnRpY2lvbiI6IkdFUkVOQ0lBIEdFTkVSQUwgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIiwicm9sIjoiQURNSU5JU1RSQURPUiBERSBBQ1RJVk9TIEZJSk9TIn0sInVzdWFyaW8iOiJqZmxvcmVzcSIsInByaW1lcl9hcGVsbGlkbyI6IkZMT1JFUyIsImV4cCI6MTY5NDEzOTkxNywiYXV0aG9yaXRpZXMiOlsiUk9MRV9BQ1RBRE0iXSwianRpIjoiYzI4NmM1ZjYtMjQxYi00ZDlmLWE4NDAtYzZhYjhkZGU0OTU3IiwiY2xpZW50X2lkIjoiZnJvbnRlbmRhcHAiLCJub21icmVzIjoiSk9FTCBKT05BVEhBTiIsImlkdXNyIjo1Njl9.O7IKo9I7y3epX_Xc9xiEeToHdyfwOL-6dpuGbxy4erc'
    // });
    // // Agrega los encabezados a la solicitud GET
    // const options = { headers: headers };

    // return this.http.get<Incorporacion[]>(`${this.urlEndPoint}/listado`);
    // return this.http.get<Incorporacion[]>(`${this.urlEndPoint}/listado`, { headers: this.httpHeaders });
    return this.http.get<Incorporacion[]>(`${this.urlEndPoint}/listado`, { headers: headersGLOBAL });
  }
}
