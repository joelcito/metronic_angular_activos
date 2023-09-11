import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { URL_GLOBAL } from 'src/app/config';
import { HEADERS_GLOBAL } from 'src/app/headers';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ReporteService {

  private urlEndPoint: string = URL_GLOBAL+"/reporte";

  // DESARROLLO
  // private httpHeaders = new HttpHeaders({'Content-Type': 'application/json'});
  // END DESARROLLO

  // PRODUCCION
  // private httpHeaders = new HttpHeaders({
  //   'Authorization': 'Bearer '+sessionStorage.access_token
  // });
  // END PRODUCCION

  constructor(private http: HttpClient) { }

  reportIncoporacion(json:any){
    const headersGLOBAL = HEADERS_GLOBAL;
    return this.http.post<any[]>(`${this.urlEndPoint}/reportIncoporacion`,json,{headers: headersGLOBAL});
        // return this.http.post<any[]>(`${this.urlEndPoint}/reportIncoporacion`,json,{headers: this.httpHeaders});
  }

  reporteGeneral(json:any){
    const headersGLOBAL = HEADERS_GLOBAL;
    return this.http.post<any[]>(`${this.urlEndPoint}/reporteGeneral`,json,{headers: headersGLOBAL});
        // return this.http.post<any[]>(`${this.urlEndPoint}/reporteGeneral`,json,{headers: this.httpHeaders});
  }

  reporteGeneralNew(json:any): Observable<Blob> {
    const headersGLOBAL = HEADERS_GLOBAL;
    return this.http.post(`${this.urlEndPoint}/reportGeneralPDF`,json,{headers: headersGLOBAL, responseType: 'blob'});
        // return this.http.post(`${this.urlEndPoint}/reportGeneralPDF`,json,{headers: this.httpHeaders, responseType: 'blob'});
  }

  reportePorRegimen(json:any): Observable<Blob> {
    const headersGLOBAL = HEADERS_GLOBAL;
    return this.http.post(`${this.urlEndPoint}/reportePorRegimen`,json,{headers: headersGLOBAL, responseType: 'blob'});
        // return this.http.post(`${this.urlEndPoint}/reportePorRegimen`,json,{headers: this.httpHeaders, responseType: 'blob'});
  }

  reportePorGrupo(json:any): Observable<Blob> {
    const headersGLOBAL = HEADERS_GLOBAL;
    return this.http.post(`${this.urlEndPoint}/reportePorGrupo`,json,{headers: headersGLOBAL, responseType: 'blob'});
        // return this.http.post(`${this.urlEndPoint}/reportePorGrupo`,json,{headers: this.httpHeaders, responseType: 'blob'});
  }

  reporteAsignacion(json:any): Observable<Blob> {
    const headersGLOBAL = HEADERS_GLOBAL;
    return this.http.post(`${this.urlEndPoint}/reporteAsignacion`,json,{headers: headersGLOBAL, responseType: 'blob'});
        // return this.http.post(`${this.urlEndPoint}/reporteAsignacion`,json,{headers: this.httpHeaders, responseType: 'blob'});
  }
  
  reporteIncorporacion(json:any): Observable<Blob>{
    const headersGLOBAL = HEADERS_GLOBAL;
    return this.http.post(`${this.urlEndPoint}/reporteIncorporacion`,json,{headers: headersGLOBAL, responseType: 'blob'});
        // return this.http.post(`${this.urlEndPoint}/reporteIncorporacion`,json,{headers: this.httpHeaders, responseType: 'blob'});
  }
  buscarPersona(json:any){
    const headersGLOBAL = HEADERS_GLOBAL;
    return this.http.post<any[]>(`${this.urlEndPoint}/buscarPersona`,json,{headers: headersGLOBAL});
        // return this.http.post<any[]>(`${this.urlEndPoint}/buscarPersona`,json,{headers: this.httpHeaders});
  }

}
