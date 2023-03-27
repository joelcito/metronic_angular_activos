import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import { GrupoComponent } from './grupos.component';
import { RouterModule } from '@angular/router';
import { InlineSVGModule } from 'ng-inline-svg-2';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SubGrupoComponent } from './sub-grupo/sub-grupo.component';


@NgModule({
  declarations: [
    GrupoComponent,
    SubGrupoComponent
  ],
  imports: [
    CommonModule,
    InlineSVGModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild([
      {path: 'listado', component: GrupoComponent},
      {path: 'subGrupo/:id', component: SubGrupoComponent}
    ])
  ]
})
export class GrupoModule { }
