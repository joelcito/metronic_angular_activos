import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InlineSVGModule } from 'ng-inline-svg-2';

import { PartidaComponent } from './partida.component';

@NgModule({
  declarations: [
    PartidaComponent
  ],
  imports: [
    CommonModule,
    InlineSVGModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild([
      {path: 'listado', component: PartidaComponent},
    ])
  ]
})
export class PartidaModule { }
