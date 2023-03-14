import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
// import { BuilderComponent } from './builder.component';
import { ActivoComponent } from './activo.component';
import { FormsModule } from '@angular/forms';
import { NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { InlineSVGModule } from 'ng-inline-svg-2';
// import { TablesComponent } from 'src/app/modules/widgets-examples/tables/tables.component';
// import { TablesComponent } from './../tables/tables.component';

// PARA LOS SERVICION
import { HttpHeaders, HttpClient } from  '@angular/common/http';
import { Observable } from 'rxjs';
import { Activo } from './activo';
import { map } from 'rxjs/operators';

@NgModule({
  declarations: [ActivoComponent],
  imports: [
    CommonModule,
    // FormsModule,
    InlineSVGModule,
    // NgbTooltipModule,
    RouterModule.forChild([
      {path: 'listado',component: ActivoComponent},
      // {path: 'listado',component: ActivoComponent},
    ]),
  ],
})

// @Injectable({
//   providedIn: 'root'
// })
// export class BuilderModule {}
export class ActivoModule {

  // private urlEndPoint: string = "http://localhost:9999/api/activo";
  // private httpHeaders = new HttpHeaders({'Content-Type': 'application/json'});

  // constructor(private http: HttpClient) { }

  // getActivos():Observable<Activo[]>{
  //   return this.http.get(this.urlEndPoint+"/listado").pipe(
  //     map(response => response as Activo[])
  //   );
  // }

  // create(activo:Activo): Observable<Activo>{
  //   return this.http.post<Activo>(this.urlEndPoint+"/", activo,{headers: this.httpHeaders})
  // }

  // getActivo(id:number): Observable<Activo>{
  //   return this.http.get<Activo>(this.urlEndPoint+"/"+id)
  // }

  // delete(id:number): Observable<Activo>{
  //   return this.http.delete<Activo>(this.urlEndPoint+"/"+id, {headers: this.httpHeaders})
  // }
}
