import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Incorporacion } from './incorporacion';
import { URL_GLOBAL } from 'src/app/config';

@Injectable({
  providedIn: 'root'
})
export class IncorporacionService {

  // private urlEndPoint: string = "http://localhost:9999/api/incorporacion";
  // private urlEndPoint: string = "http://10.150.10.23:9003/api/incorporacion";
  // private urlEndPoint: string = "api/incorporacion";
  private urlEndPoint: string = URL_GLOBAL+"/incorporacion";


  constructor(
    private http: HttpClient
  ) { }

  getIncorporaciones() {
    return this.http.get<Incorporacion[]>(`${this.urlEndPoint}/listado`);
  }
}
