import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { URL_GLOBAL } from 'src/app/config';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ReporteService {

  private urlEndPoint: string = URL_GLOBAL+"/reporte";
  private httpHeaders = new HttpHeaders({'Content-Type': 'application/json'});

  constructor(private http: HttpClient) { }

  reportIncoporacion(json:any){
    return this.http.post<any[]>(`${this.urlEndPoint}/reportIncoporacion`,json,{headers: this.httpHeaders});
  }

  reporteGeneral(json:any){
    return this.http.post<any[]>(`${this.urlEndPoint}/reporteGeneral`,json,{headers: this.httpHeaders});
  }

  reporteGeneralNew(json:any): Observable<Blob> {
    return this.http.post(`${this.urlEndPoint}/reportGeneralPDF`,json,{headers: this.httpHeaders, responseType: 'blob'});
  }

  reportePorRegimen(json:any): Observable<Blob> {
    return this.http.post(`${this.urlEndPoint}/reportePorRegimen`,json,{headers: this.httpHeaders, responseType: 'blob'});
  }

  reportePorGrupo(json:any): Observable<Blob> {
    return this.http.post(`${this.urlEndPoint}/reportePorGrupo`,json,{headers: this.httpHeaders, responseType: 'blob'});
  }

  reporteAsignacion(json:any): Observable<Blob> {
    return this.http.post(`${this.urlEndPoint}/reporteAsignacion`,json,{headers: this.httpHeaders, responseType: 'blob'});
  }

  buscarPersona(json:any){
    return this.http.post<any[]>(`${this.urlEndPoint}/buscarPersona`,json,{headers: this.httpHeaders});
  }
}
