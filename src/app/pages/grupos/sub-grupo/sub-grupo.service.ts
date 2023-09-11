import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { SubGrupo } from './sub-grupo';
import { Observable } from 'rxjs';

import { URL_GLOBAL } from 'src/app/config';
import { HEADERS_GLOBAL } from 'src/app/headers';

@Injectable({
  providedIn: 'root'
})
export class SubGrupoService {

  // private urlEndPoint:String = "http://localhost:9999/api/subGrupo";
  // private urlEndPoint:String = "http://10.150.10.23:9003/api/subGrupo";
  // private urlEndPoint:String = "api/subGrupo";
  private urlEndPoint: string = URL_GLOBAL+"/subGrupo";

  // DESARROLLO
  // private httpHeaders = new HttpHeaders({'Content-Type': 'application/json'});
  // END DESARROLLO
  
  // PRODUCCION
  // private httpHeaders = new HttpHeaders({
  //   'Authorization': 'Bearer '+sessionStorage.access_token
  // });
  // END PRODUCCION


  constructor(
    private http:HttpClient
  ) { }

  getSubGrupos(){
    const headersGLOBAL = HEADERS_GLOBAL;
    // return this.http.get<SubGrupo[]>(`${this.urlEndPoint}/listado`, { headers: this.httpHeaders })
    return this.http.get<SubGrupo[]>(`${this.urlEndPoint}/listado`, { headers: headersGLOBAL })
  }

  getSubGruposByIdGrupo(idgrupo:string){
    const headersGLOBAL = HEADERS_GLOBAL;
    // return this.http.get<SubGrupo[]>(`${this.urlEndPoint}/byGrupo/${idgrupo}`, { headers: this.httpHeaders })
    return this.http.get<SubGrupo[]>(`${this.urlEndPoint}/byGrupo/${idgrupo}`, { headers: headersGLOBAL })
  }

  getSubGrupoById(idsubgrupo:String){
    const headersGLOBAL = HEADERS_GLOBAL;
    // return this.http.get<SubGrupo>(`${this.urlEndPoint}/${idsubgrupo}`, { headers: this.httpHeaders })
    return this.http.get<SubGrupo>(`${this.urlEndPoint}/${idsubgrupo}`, { headers: headersGLOBAL })
  }

  createSubGrupo(subGrupo:SubGrupo):Observable<SubGrupo>{
    const headersGLOBAL = HEADERS_GLOBAL;
    // return this.http.post<SubGrupo>(`${this.urlEndPoint}/`, subGrupo, { headers: this.httpHeaders});
    return this.http.post<SubGrupo>(`${this.urlEndPoint}/`, subGrupo, { headers: headersGLOBAL});
  }

  upDate(subGrupo:SubGrupo):Observable<SubGrupo>{
    const headersGLOBAL = HEADERS_GLOBAL;
    // return this.http.put<SubGrupo>(`${this.urlEndPoint}/${subGrupo.idsubgrupo}`,subGrupo,{headers:this.httpHeaders})
    return this.http.put<SubGrupo>(`${this.urlEndPoint}/${subGrupo.idsubgrupo}`,subGrupo,{headers:headersGLOBAL})
  }

  deleteSubGrupo(idsubgrupo:String):Observable<SubGrupo>{
    const headersGLOBAL = HEADERS_GLOBAL;
    // return this.http.delete<SubGrupo>(`${this.urlEndPoint}/${idsubgrupo}`, {headers:this.httpHeaders});
    return this.http.delete<SubGrupo>(`${this.urlEndPoint}/${idsubgrupo}`, {headers:headersGLOBAL});
  }

}
