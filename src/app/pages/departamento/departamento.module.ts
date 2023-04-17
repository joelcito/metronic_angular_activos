import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { DepartamentoComponent } from './departamento.component';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {path: 'listado', component: DepartamentoComponent},
    ])
  ]
})
export class DepartamentoModule { }
