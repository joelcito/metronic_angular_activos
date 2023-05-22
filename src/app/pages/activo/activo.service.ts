import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Activo } from './activo';
import { map } from 'rxjs/operators';

import { URL_GLOBAL } from 'src/app/config';


@Injectable({
  providedIn: 'root'
})

export class ActivoService {

  // private urlEndPoint: string = "http://localhost:9999/api/activo";
  // private urlEndPoint: string = "http://10.150.10.23:9003/api/activo";
  // private urlEndPoint: string = "api/activo";

  private urlEndPoint: string = URL_GLOBAL+"/activo";
  private urlEndPointExterno: string = URL_GLOBAL+"/externo";

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

  calculaDepre(id:String, fecha:String){
    return this.http.get(`${this.urlEndPoint}/calculaDepre/${id}/${fecha}`).pipe(map(res => JSON.parse(JSON.stringify(res))));
  }
  calculaDepreModificable(json:string){
    return this.http.post(`${this.urlEndPoint}/calculaDepreModificable`, json,{headers: this.httpHeaders}).pipe(map(rest => JSON.parse(JSON.stringify(rest)))
    )
  }

  listarParsonalizado(){
    return this.http.get<any[]>(this.urlEndPoint+"/listadoPer")
  }

  buscarActivo(idactivo:String, descripcion:String, buscarActivo:String){
    const datos = {
      variable1: idactivo,
      variable2: descripcion,
      variable3: buscarActivo
    };
    return this.http.post<any[]>(this.urlEndPoint+"/buscaActivo",datos,{headers: this.httpHeaders})
  }

  listaProvedores(){
    return this.http.get<any[]>(`${this.urlEndPointExterno}/getProvedores`)
  }

  listaMovimientosActivoById(idactivo:String){
    return this.http.get<any[]>(`${this.urlEndPointExterno}/listaMovimientosActivoById/${idactivo}`)
  }

  getUltimoMovActivo(idactivo:String){
    return this.http.get<any>(`${this.urlEndPointExterno}/getUltimoMovActivo/${idactivo}`)
  }

  getCargos(){
    return this.http.get<any[]>(`${this.urlEndPointExterno}/getCargos`)
  }

  getUbiEsp(){
    return this.http.get<any[]>(`${this.urlEndPointExterno}/getUbiEsp`)
  }

  guardaLiberacionActivo(json:any){
    return this.http.post<any>(`${this.urlEndPointExterno}/guardaLiberacionActivo`,json,{headers: this.httpHeaders});
  }

  getPersonaByCi(ci:String){
    return this.http.get<any>(`${this.urlEndPointExterno}/getPersonaByCi/${ci}`)
  }
  
  getReparticiones(){
    return this.http.get<any[]>(`${this.urlEndPointExterno}/getReparticiones`)
  }

  guardaRefaccion(json:any){
    return this.http.post<any>(`${this.urlEndPointExterno}/guardaRefaccion`,json,{headers: this.httpHeaders});
  }

  getRefaccionesByIdActivo(codactivo:string){
    return this.http.get<any[]>(`${this.urlEndPointExterno}/getRefaccionesByIdActivo/${codactivo}`);
  }
  
}
