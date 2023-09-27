import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Activo } from './activo';
import { map } from 'rxjs/operators';

import { URL_GLOBAL } from 'src/app/config';
import { HEADERS_GLOBAL } from 'src/app/headers';


@Injectable({
  providedIn: 'root'
})
  
export class ActivoService {

  // private urlEndPoint: string = "http://localhost:9999/api/activo";
  // private urlEndPoint: string = "http://10.150.10.23:9003/api/activo";
  // private urlEndPoint: string = "api/activo";

  private urlEndPoint: string = URL_GLOBAL+"/activo";
  // private urlEndPoint: string = URL_GLOBAL+"/activos";
  private urlEndPointExterno: string = URL_GLOBAL+"/externo";

  // DESARROLLO
  // private httpHeaders = new HttpHeaders({'Content-Type': 'application/json'});
  // END DESARROLLO

  // PRODUCCION
  // private httpHeaders = new HttpHeaders({
  //   'Authorization': 'Bearer '+sessionStorage.access_token
  // });
  // END PRODUCCION


  constructor(private http: HttpClient) { }

  getActivos(){
    const headersGLOBAL = HEADERS_GLOBAL;

    // return this.http.get<Activo[]>(this.urlEndPoint+"/listado", { headers: this.httpHeaders })
    return this.http.get<Activo[]>(this.urlEndPoint+"/listado", { headers: headersGLOBAL })
  }

  create(activo:Activo): Observable<Activo>{
    const headersGLOBAL = HEADERS_GLOBAL;

    // return this.http.post<Activo>(this.urlEndPoint+"/", activo,{headers: this.httpHeaders})
    return this.http.post<Activo>(this.urlEndPoint+"/", activo,{headers: headersGLOBAL })
  }

  delete(id:string): Observable<Activo>{
    const headersGLOBAL = HEADERS_GLOBAL;

    // return this.http.delete<Activo>(this.urlEndPoint+"/"+id, {headers: this.httpHeaders})
    return this.http.delete<Activo>(this.urlEndPoint+"/"+id, {headers: headersGLOBAL })
  }

  getActivo(id:string){
    const headersGLOBAL = HEADERS_GLOBAL;

    // return this.http.get<Activo>(this.urlEndPoint+"/"+id, { headers: this.httpHeaders })
    return this.http.get<Activo>(this.urlEndPoint+"/"+id, { headers: headersGLOBAL })
  }

  calculaDepre(id:String, fecha:String){
    const headersGLOBAL = HEADERS_GLOBAL;

    // return this.http.get(`${this.urlEndPoint}/calculaDepre/${id}/${fecha}`, { headers: this.httpHeaders }).pipe(map(res => JSON.parse(JSON.stringify(res))));
    return this.http.get(`${this.urlEndPoint}/calculaDepre/${id}/${fecha}`, { headers: headersGLOBAL }).pipe(map(res => JSON.parse(JSON.stringify(res))));
  }

  calculaDepreModificable(json:string){
    const headersGLOBAL = HEADERS_GLOBAL;

    // return this.http.post(`${this.urlEndPoint}/calculaDepreModificable`, json,{headers: this.httpHeaders}).pipe(map(rest => JSON.parse(JSON.stringify(rest)))
    return this.http.post(`${this.urlEndPoint}/calculaDepreModificable`, json,{headers: headersGLOBAL }).pipe(map(rest => JSON.parse(JSON.stringify(rest)))
    )
  }

  listarParsonalizado(){
    const headersGLOBAL = HEADERS_GLOBAL;

    // return this.http.get<any[]>(this.urlEndPoint+"/listadoPer", { headers: this.httpHeaders })
    return this.http.get<any[]>(this.urlEndPoint+"/listadoPer", { headers: headersGLOBAL })
  }

  buscarActivo(idactivo:String, descripcion:String,estadoActivo:String, estadoVigencia:String){
    const headersGLOBAL = HEADERS_GLOBAL;

    const datos = {
      variable1: idactivo,
      variable2: descripcion,
      variable3: estadoActivo,
      variable4: estadoVigencia
    };
    // return this.http.post<any[]>(this.urlEndPoint+"/buscaActivo",datos,{headers: this.httpHeaders})
    return this.http.post<any[]>(this.urlEndPoint+"/buscaActivo",datos,{headers: headersGLOBAL })
  }

  listaProvedores(){
    const headersGLOBAL = HEADERS_GLOBAL;

    // return this.http.get<any[]>(`${this.urlEndPointExterno}/getProvedores`, { headers: this.httpHeaders })
    return this.http.get<any[]>(`${this.urlEndPointExterno}/getProvedores`, { headers: headersGLOBAL })
  }

  listaMovimientosActivoById(idactivo:String){
    const headersGLOBAL = HEADERS_GLOBAL;

    // return this.http.get<any[]>(`${this.urlEndPointExterno}/listaMovimientosActivoById/${idactivo}`, { headers: this.httpHeaders })
    return this.http.get<any[]>(`${this.urlEndPointExterno}/listaMovimientosActivoById/${idactivo}`, { headers: headersGLOBAL })
  }

  getUltimoMovActivo(idactivo:String){
    const headersGLOBAL = HEADERS_GLOBAL;

    // return this.http.get<any>(`${this.urlEndPointExterno}/getUltimoMovActivo/${idactivo}`, { headers: this.httpHeaders })
    return this.http.get<any>(`${this.urlEndPointExterno}/getUltimoMovActivo/${idactivo}`, { headers: headersGLOBAL })
  }

  getCargos(){
    const headersGLOBAL = HEADERS_GLOBAL;

    // return this.http.get<any[]>(`${this.urlEndPointExterno}/getCargos`, { headers: this.httpHeaders })
    return this.http.get<any[]>(`${this.urlEndPointExterno}/getCargos`, { headers: headersGLOBAL })
  }

  getUbiEsp(){
    const headersGLOBAL = HEADERS_GLOBAL;

    // return this.http.get<any[]>(`${this.urlEndPointExterno}/getUbiEsp`, { headers: this.httpHeaders })
    return this.http.get<any[]>(`${this.urlEndPointExterno}/getUbiEsp`, { headers: headersGLOBAL })
  }

  getUbiGral(){
    const headersGLOBAL = HEADERS_GLOBAL;

    // return this.http.get<any[]>(`${this.urlEndPointExterno}/getUbiGral`, { headers: this.httpHeaders })
    return this.http.get<any[]>(`${this.urlEndPointExterno}/getUbiGral`, { headers: headersGLOBAL })
  }

  guardaLiberacionActivo(json:any){
    const headersGLOBAL = HEADERS_GLOBAL;

    // return this.http.post<any>(`${this.urlEndPointExterno}/guardaLiberacionActivo`,json,{headers: this.httpHeaders});
    return this.http.post<any>(`${this.urlEndPointExterno}/guardaLiberacionActivo`,json,{headers: headersGLOBAL });
  }

  getPersonaByCi(ci:String){
    const headersGLOBAL = HEADERS_GLOBAL;

    // return this.http.get<any>(`${this.urlEndPointExterno}/getPersonaByCi/${ci}`, { headers: this.httpHeaders })
    return this.http.get<any>(`${this.urlEndPointExterno}/getPersonaByCi/${ci}`, { headers: headersGLOBAL })
  }

  getPersonasNombre(nombre:String){
    const headersGLOBAL = HEADERS_GLOBAL;

    // return this.http.post<any[]>(`${this.urlEndPointExterno}/getPersonasNombre`, nombre,{headers: this.httpHeaders})
    return this.http.post<any[]>(`${this.urlEndPointExterno}/getPersonasNombre`, nombre,{headers: headersGLOBAL })
  }

  getReparticiones(){
    const headersGLOBAL = HEADERS_GLOBAL;

    // return this.http.get<any[]>(`${this.urlEndPointExterno}/getReparticiones`, { headers: this.httpHeaders })
    return this.http.get<any[]>(`${this.urlEndPointExterno}/getReparticiones`, { headers: headersGLOBAL })
  }

  guardaRefaccion(json:any){
    const headersGLOBAL = HEADERS_GLOBAL;

    // return this.http.post<any>(`${this.urlEndPointExterno}/guardaRefaccion`,json,{headers: this.httpHeaders});
    return this.http.post<any>(`${this.urlEndPointExterno}/guardaRefaccion`,json,{headers: headersGLOBAL });
  }

  getRefaccionesByIdActivo(codactivo:string){
    const headersGLOBAL = HEADERS_GLOBAL;

    // return this.http.get<any[]>(`${this.urlEndPointExterno}/getRefaccionesByIdActivo/${codactivo}`, { headers: this.httpHeaders });
    return this.http.get<any[]>(`${this.urlEndPointExterno}/getRefaccionesByIdActivo/${codactivo}`, { headers: headersGLOBAL });
  }

  getActivoMaximoByIdRegional(idregional:string){
    const headersGLOBAL = HEADERS_GLOBAL;

    // return this.http.get<any>(`${this.urlEndPoint}/getActivoMaximoByIdRegional/${idregional}`, { headers: this.httpHeaders });
    return this.http.get<any>(`${this.urlEndPoint}/getActivoMaximoByIdRegional/${idregional}`, { headers: headersGLOBAL });
  }

  guardaBajaActivo(json:any){
    const headersGLOBAL = HEADERS_GLOBAL;

    // return this.http.post<any>(`${this.urlEndPointExterno}/guardaBajaActivo`,json,{headers: this.httpHeaders});
    return this.http.post<any>(`${this.urlEndPointExterno}/guardaBajaActivo`,json,{headers: headersGLOBAL });
  }

  uploadImage(image: File, idactivo: String){
    const headersGLOBAL = HEADERS_GLOBAL;

    const formData = new FormData();
    formData.append('image', image);
    formData.append('idactivo', idactivo.toString());
    // formData.append('idactivo', idactivo);

    // return this.http.post<any>(`${this.urlEndPoint}/uploadImage`, formData, { headers: this.httpHeaders });
    return this.http.post<any>(`${this.urlEndPoint}/uploadImage`, formData, { headers: headersGLOBAL });
  }

  getImageActivo(image:String){
    const headersGLOBAL = HEADERS_GLOBAL;

    // return this.http.get<any>(`${this.urlEndPoint}/images/${image}`, { headers: this.httpHeaders });
    return this.http.get<any>(`${this.urlEndPoint}/images/${image}`, { headers: headersGLOBAL });
  }

  getUbiGralByIdRegional(regional:String){
    const headersGLOBAL = HEADERS_GLOBAL;
    return this.http.get<any[]>(`${this.urlEndPointExterno}/getUbiGralByIdRegional/${regional}`,{headers: headersGLOBAL })
  }

  getUbiEspByIdGral(idUbiGral:String, idRegional:String){
    const headersGLOBAL = HEADERS_GLOBAL;
    return this.http.get<any[]>(`${this.urlEndPointExterno}/getUbiEspByIdGral/${idUbiGral}/${idRegional}`,{headers: headersGLOBAL })
    // return this.http.get<any[]>(`${this.urlEndPointExterno}/getUbiEspByIdGral/${idUbiGral}`,{headers: headersGLOBAL })
  }
  
}
