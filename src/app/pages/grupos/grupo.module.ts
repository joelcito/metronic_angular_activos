import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import { GrupoComponent } from './grupos.component';
import { RouterModule } from '@angular/router';
import { InlineSVGModule } from 'ng-inline-svg-2';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SubGrupoComponent } from './sub-grupo/sub-grupo.component';
import { ComponenteComponent } from './sub-grupo/componente/componente.component';


@NgModule({
  declarations: [
    GrupoComponent,
    SubGrupoComponent,
    ComponenteComponent
  ],
  imports: [
    CommonModule,
    InlineSVGModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild([
      {path: 'listado', component: GrupoComponent},
      {path: 'subGrupo/:id', component: SubGrupoComponent},
      {path: 'subGrupo/:idgrupo/:idsubgrupo', component: ComponenteComponent}
    ])
  ]
})
export class GrupoModule { }
