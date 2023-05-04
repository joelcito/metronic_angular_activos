import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Regional } from './regional';

import { URL_GLOBAL } from 'src/app/config';

@Injectable({
  providedIn: 'root'
})
export class RegionalService {

  // private urlEndPoint: string = "http://localhost:9999/api/regional";
  // private urlEndPoint: string = "http://10.150.10.23:9003/api/regional";
  // private urlEndPoint: string = "api/regional";
  private urlEndPoint: string = URL_GLOBAL+"/regional";

  // private httpHeaders = new HttpHeaders({'Content-Type': 'application/json'});

  constructor(
    private http: HttpClient
  ) { }

  getRegionales(){
    return this.http.get<Regional[]>(`${this.urlEndPoint}/listado`)
  }
}
