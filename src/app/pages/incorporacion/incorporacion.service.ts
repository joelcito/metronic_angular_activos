import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Incorporacion } from './incorporacion';

@Injectable({
  providedIn: 'root'
})
export class IncorporacionService {

  private urlEndPoint: string = "http://localhost:9999/api/incorporacion";

  constructor(
    private http: HttpClient
  ) { }

  getIncorporaciones() {
    return this.http.get<Incorporacion[]>(`${this.urlEndPoint}/listado`);
  }
}
