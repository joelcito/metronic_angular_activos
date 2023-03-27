import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';

import { Componente } from './componente';

@Injectable({
  providedIn: 'root'
})
export class ComponenteService {

  private urlEndPoint:String = "http://localhost:9999/api/componente";
  // private httpHeaders = new HttpHeaders({'Content-Type': 'application/json'});

  constructor(
    private http:HttpClient
  ) { }

  getComponenteByIdSubGrupo(id:string){
    return this.http.get<Componente[]>(`${this.urlEndPoint}/getComponeteByIdSubGrupo/${id}`)
  }
}
