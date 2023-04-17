import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TransaccionComponent } from './transaccion.component';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {path: 'listado', component: TransaccionComponent},
    ])
  ]
})
export class TransaccionModule { }
