import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SubGrupo } from './sub-grupo';

@Injectable({
  providedIn: 'root'
})
export class SubGrupoService {

  private urlEndPoint:String = "http://localhost:9999/api/subGrupo";

  constructor(
    private http:HttpClient
  ) { }

  getSubGrupos(){
    return this.http.get<SubGrupo[]>(`${this.urlEndPoint}/listado`)
  }

  getSubGruposByIdGrupo(idgrupo:string){
    return this.http.get<SubGrupo[]>(`${this.urlEndPoint}/byGrupo/${idgrupo}`)
  }

  getSubGrupoById(idsubgrupo:String){
    return this.http.get<SubGrupo>(`${this.urlEndPoint}/${idsubgrupo}`)
  }
}
