import { Injectable } from '@angular/core';
import { URL_GLOBAL } from 'src/app/config';
import { HttpClient, HttpHeaders } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class ProvedorService {

  constructor(
    private http: HttpClient
  ) { }
  
  private urlEndPointExterno: string = URL_GLOBAL+"/externo";

  private httpHeaders = new HttpHeaders({'Content-Type': 'application/json'});

  getProvedoresTodo(){
    return this.http.get<any[]>(`${this.urlEndPointExterno}/getProvedoresTodo`);
  }

  getProvedor(codprovedor:String){
    return this.http.get<any>(`${this.urlEndPointExterno}/getProvedor/${codprovedor}`);
  }

  guardarProvedor(json:any){
    return this.http.post<any>(`${this.urlEndPointExterno}/guardarProvedor`, json , { headers: this.httpHeaders})
  }
}
