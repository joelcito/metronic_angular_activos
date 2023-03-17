import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { ModalsModule, WidgetsModule } from '../../_metronic/partials';


import { ActivoComponent } from '../activo/activo.component';

@NgModule({
  declarations: [DashboardComponent],
  imports: [
    CommonModule,

    RouterModule.forChild([
      {
        path: '',component: DashboardComponent,
      },
    ]),
    WidgetsModule,
    ModalsModule,
  ],
})
export class DashboardModule {}
