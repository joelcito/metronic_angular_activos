import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { SubGrupo } from './sub-grupo';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SubGrupoService {

  private urlEndPoint:String = "http://localhost:9999/api/subGrupo";
  private httpHeaders = new HttpHeaders({'Content-Type': 'application/json'});


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

  createSubGrupo(subGrupo:SubGrupo):Observable<SubGrupo>{
    return this.http.post<SubGrupo>(`${this.urlEndPoint}/`, subGrupo, { headers: this.httpHeaders});
  }

  upDate(subGrupo:SubGrupo):Observable<SubGrupo>{
    return this.http.put<SubGrupo>(`${this.urlEndPoint}/${subGrupo.idsubgrupo}`,subGrupo,{headers:this.httpHeaders})
  }

  deleteSubGrupo(idsubgrupo:String):Observable<SubGrupo>{
    return this.http.delete<SubGrupo>(`${this.urlEndPoint}/${idsubgrupo}`, {headers:this.httpHeaders});
  }

}
