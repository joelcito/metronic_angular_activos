import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { Ufv } from './ufv';


@Injectable({
  providedIn: 'root'
})
export class UfvService {

  // private urlEndPoint: string = "http://localhost:9999/api/ufv";
  // private urlEndPoint: string = "http://10.150.10.23:9003/api/ufv";
  private urlEndPoint: string = "api/ufv";
  private httpHeaders = new HttpHeaders({'Content-Type': 'application/json'});

  constructor(
    private http: HttpClient
  ) { }

  getUfvByFecha(fecha:string):Observable<Ufv>{
    return this.http.get<Ufv>(`${this.urlEndPoint}/${fecha}`)
  }
}
