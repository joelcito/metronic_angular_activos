import { Component, OnInit, ChangeDetectorRef } from '@angular/core';

import { UnidadManejo } from './unidad-manejo';

import { UnidadManejoService } from './unidad-manejo.service';

@Component({
  selector: 'app-unidad-manejo',
  templateUrl: './unidad-manejo.component.html',
})
export class UnidadManejoComponent implements OnInit {

  unidad_manejos:UnidadManejo[] = [];


  constructor(
    private unidadManejoService:UnidadManejoService,
    private chdr:ChangeDetectorRef,
  ) { }

  ngOnInit(): void {
    this.listadoUnidadesdeManejo();
  }

  listadoUnidadesdeManejo(){
    this.unidadManejoService.getUnidadManejos().subscribe(result =>{
      this.unidad_manejos = result;
      this.chdr.detectChanges();
    })
  }

}
