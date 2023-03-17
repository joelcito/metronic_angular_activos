import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ActivoComponent } from './activo.component';
import { InlineSVGModule } from 'ng-inline-svg-2';

@NgModule({
  declarations: [ActivoComponent],
  imports: [
    CommonModule,
    InlineSVGModule,
    // ActivoComponent,
    RouterModule.forChild([
      {path: 'listado',component: ActivoComponent},
      // {path: '',component: ActivoComponent},
    ]),
  ],

})

export class ActivoModule {

}

