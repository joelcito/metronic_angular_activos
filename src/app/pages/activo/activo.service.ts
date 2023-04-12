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

  getActivos(){
    return this.http.get<Activo[]>(this.urlEndPoint+"/listado")
  }

  create(activo:Activo): Observable<Activo>{
    return this.http.post<Activo>(this.urlEndPoint+"/", activo,{headers: this.httpHeaders})
  }

  delete(id:string): Observable<Activo>{
    return this.http.delete<Activo>(this.urlEndPoint+"/"+id, {headers: this.httpHeaders})
  }

  getActivo(id:string){
    return this.http.get<Activo>(this.urlEndPoint+"/"+id)
  }

}
