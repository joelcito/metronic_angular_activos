import { Injectable } from '@angular/core';
import { URL_GLOBAL } from 'src/app/config';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { HEADERS_GLOBAL } from 'src/app/headers';

@Injectable({
  providedIn: 'root'
})
export class ProvedorService {

  constructor(
    private http: HttpClient
  ) { }
  
  private urlEndPointExterno: string = URL_GLOBAL+"/externo";

  // DESARROLLO
  // private httpHeaders = new HttpHeaders({'Content-Type': 'application/json'});
  // END DESARROLLO
  
  // PRODUCCION
  // private httpHeaders = new HttpHeaders({
  //   'Authorization': 'Bearer '+sessionStorage.access_token
  // });
  // END PRODUCCION


  getProvedoresTodo(){
    const headersGLOBAL = HEADERS_GLOBAL;
    return this.http.get<any[]>(`${this.urlEndPointExterno}/getProvedoresTodo`, { headers: headersGLOBAL });
    // return this.http.get<any[]>(`${this.urlEndPointExterno}/getProvedoresTodo`, { headers: this.httpHeaders });
  }

  getProvedor(codprovedor:String){
    const headersGLOBAL = HEADERS_GLOBAL;
    return this.http.get<any>(`${this.urlEndPointExterno}/getProvedor/${codprovedor}`, { headers: headersGLOBAL });
    // return this.http.get<any>(`${this.urlEndPointExterno}/getProvedor/${codprovedor}`, { headers: this.httpHeaders });
  }

  guardarProvedor(json:any){
    const headersGLOBAL = HEADERS_GLOBAL;
    return this.http.post<any>(`${this.urlEndPointExterno}/guardarProvedor`, json , { headers: headersGLOBAL })
    // return this.http.post<any>(`${this.urlEndPointExterno}/guardarProvedor`, json , { headers: this.httpHeaders})
  }
}
