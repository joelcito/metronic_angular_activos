import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { IncorporacionComponent } from './incorporacion.component';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {path: 'listado', component: IncorporacionComponent},
    ])
  ]
})
export class IncorporacionModule { }
