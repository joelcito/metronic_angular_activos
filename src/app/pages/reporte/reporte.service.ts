import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { URL_GLOBAL } from 'src/app/config';


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
}
