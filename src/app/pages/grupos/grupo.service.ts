import { Injectable } from '@angular/core';

import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Grupo } from './grupo';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GrupoService {

  private urlEndPoint:String = "http://localhost:9999/api/grupo";

  private httpHeaders = new HttpHeaders({'Content-Type': 'application/json'});

  constructor(
    private http:HttpClient
  ) { }

  getGrupos():Observable<Grupo[]>{
    return this.http.get(this.urlEndPoint+"/listado").pipe(
      map((response) => response as Grupo[])
    )
  }
}
