import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient, HttpClientJsonpModule } from '@angular/common/http';

import { Componente } from './componente';
import { JsonPipe } from '@angular/common';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ComponenteService {

  private urlEndPoint:String = "http://localhost:9999/api/componente";
  private httpHeaders = new HttpHeaders({'Content-Type': 'application/json'});

  constructor(
    private http:HttpClient
  ) { }

  getComponenteByIdSubGrupo(id:string){
    return this.http.get<Componente[]>(`${this.urlEndPoint}/getComponeteByIdSubGrupo/${id}`)
  }

  createComponente(componente:Componente):Observable<Componente>{
    return  this.http.post<Componente>(this.urlEndPoint+"/", componente, { headers: this.httpHeaders})
  }

  upDate(componente:Componente):Observable<Componente>{
    return this.http.put<Componente>(`${this.urlEndPoint}/${componente.idcomponente}`,componente,{headers:this.httpHeaders})
  }

  deleteComponente(id:String):Observable<Componente>{
    return this.http.delete<Componente>(`${this.urlEndPoint}/${id}`, {headers:this.httpHeaders});
  }
}
