import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ActivoComponent } from './activo.component';
import { InlineSVGModule } from 'ng-inline-svg-2';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DetalleComponent } from './detalle/detalle.component';

import { DatePipe } from '@angular/common';



@NgModule({
  declarations: [ActivoComponent, DetalleComponent],
  imports: [
    CommonModule,
    InlineSVGModule,
    // ActivoComponent,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild([
      {path: 'listado',component: ActivoComponent},
      {path: 'detalle/:id', component: DetalleComponent}
    ]),
  ],
  providers:[
    DatePipe
  ]

})

export class ActivoModule {

}

