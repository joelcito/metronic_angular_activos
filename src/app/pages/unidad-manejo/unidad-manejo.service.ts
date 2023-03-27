import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UnidadManejo } from './unidad-manejo';

@Injectable({
  providedIn: 'root'
})
export class UnidadManejoService {

  private urlEndPoint: string = "http://localhost:9999/api/unidadManejo";
  // private httpHeaders = new HttpHeaders({'Content-Type': 'application/json'});

  constructor(
    private http: HttpClient
  ) { }

  getUnidadManejos(){
    return this.http.get<UnidadManejo[]>(`${this.urlEndPoint}/listado`)
  }
}
