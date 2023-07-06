import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InlineSVGModule } from 'ng-inline-svg-2';
import { ReporteComponent } from './reporte.component';



@NgModule({
  declarations: [
    ReporteComponent
  ],
  imports: [
    CommonModule,
    InlineSVGModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild([
      {path: 'porusuario',component: ReporteComponent},
      // {path: 'general',component: ReporteComponent},
      // {path: 'detalle/:id', component: DetalleComponent},
      // {path: 'asignacion/:id', component: AsignacionComponent}
    ]),
  ],
  providers:[
    DatePipe
  ]
})
export class ReporteModule { }
