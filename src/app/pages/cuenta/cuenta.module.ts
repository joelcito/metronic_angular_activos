import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RouterModule } from '@angular/router';
import { InlineSVGModule } from 'ng-inline-svg-2';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { CuentaComponent } from './cuenta.component';

@NgModule({
  declarations: [
    CuentaComponent
  ],
  imports: [
    InlineSVGModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    RouterModule.forChild([
      {path: 'listado', component: CuentaComponent},
    ])
  ]
})
export class CuentaModule { }
