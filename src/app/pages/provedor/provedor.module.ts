import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RouterModule } from '@angular/router';
import { InlineSVGModule } from 'ng-inline-svg-2';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ProvedorComponent } from './provedor.component';


@NgModule({
  declarations: [
    ProvedorComponent
  ],
  imports: [
    InlineSVGModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    RouterModule.forChild([
      {path: 'listado', component: ProvedorComponent},
    ])
  ]
})
export class ProvedorModule { }
