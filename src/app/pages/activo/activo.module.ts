import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
// import { BuilderComponent } from './builder.component';
import { ActivoComponent } from './activo.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { InlineSVGModule } from 'ng-inline-svg-2';
// import { TablesComponent } from 'src/app/modules/widgets-examples/tables/tables.component';
// import { TablesComponent } from './../tables/tables.component';

// PARA LOS SERVICION
import { HttpClientModule } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Activo } from './activo';
import { map } from 'rxjs/operators';

@NgModule({
  declarations: [ActivoComponent],
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    InlineSVGModule,
    // NgbTooltipModule,
    RouterModule.forChild([
      {path: 'listado',component: ActivoComponent},
      // // {path: '',component: ActivoComponent},
      // {path: '',redirectTo: 'listado',pathMatch: 'full'},
    ]),
  ],
})

export class ActivoModule {}
