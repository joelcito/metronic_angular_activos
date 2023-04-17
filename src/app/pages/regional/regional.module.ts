import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { RegionalComponent } from './regional.component';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {path: 'listado', component: RegionalComponent},
    ])
  ]
})
export class RegionalModule { }
