import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { PartidaComponent } from './partida.component';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {path: 'listado', component: PartidaComponent},
    ])
  ]
})
export class PartidaModule { }
