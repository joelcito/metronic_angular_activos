import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Activo } from './activo';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class ActivoService {

  private urlEndPoint: string = "http://localhost:9999/api/activo";
  private httpHeaders = new HttpHeaders({'Content-Type': 'application/json'});

  constructor(private http: HttpClient) { }

  getActivos():Observable<Activo[]>{
    return this.http.get(this.urlEndPoint+"/listado").pipe(
      map((response) => response as Activo[])
    )
  }
}
