import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Regimen } from './regimen';

import { URL_GLOBAL } from 'src/app/config';


@Injectable({
  providedIn: 'root'
})

export class RegimenService {

  // private urlEndPoint: string = "http://10.150.10.23:9003/api/regimen";
  // private urlEndPoint: string = "api/regimen";

  private urlEndPoint: string = URL_GLOBAL+"/regimen";

  
  // private httpHeaders = new HttpHeaders({'Content-Type': 'application/json'});

  constructor(
    private http: HttpClient
  ) { }

  getRegimenes(){
    return this.http.get<Regimen[]>(`${this.urlEndPoint}/listado`)
  }
}
