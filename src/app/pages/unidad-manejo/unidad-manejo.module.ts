import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RouterModule } from '@angular/router';
import { InlineSVGModule } from 'ng-inline-svg-2';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { UnidadManejoComponent } from './unidad-manejo.component';



@NgModule({
  declarations: [
    UnidadManejoComponent
  ],
  imports: [
    InlineSVGModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    RouterModule.forChild([
      {path: 'listado', component: UnidadManejoComponent},
    ])
  ]
})
export class UnidadManejoModule { }
