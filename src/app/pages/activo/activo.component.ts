import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
// import { LayoutService } from '../../_metronic/layout';

// PARA LOS SERVICIOS
// import { ActivoModule } from './activo.module';
import { ActivoService } from './activo.service';
import { Activo } from './activo';

// import { ActivoModule } from './activo.module';
// import { finalize, map } from 'rxjs/operators';
// import { async } from '@angular/core/testing';
// import { Observable } from 'rxjs';


@Component({
  selector: 'app-activo',
  templateUrl: './activo.component.html',
})

// export class ActivoComponent{
export class ActivoComponent implements OnInit {
  model: any;
  @ViewChild('form', { static: true }) form: NgForm;
  configLoading: boolean = false;
  resetLoading: boolean = false;
  tabla: boolean = false;

  activos1: any = [];

  constructor(
    private activoService: ActivoService,
  ){
  }

  ngOnInit(){
    this.activos1 = this.activoService.getActivos();
  }

  openModal(){
    console.log("haber este")
  }

  // cargar(){
  //   console.log("antes de cargar")
  //   this.activoService.getActivos().subscribe(
  //     (activos) => {
  //       this.activos = activos
  //       console.log(this.activos)
  //     }
  //   )
  //   console.log("terminando de cargar")
  // }

  // setActiveTab(tab: Tabs) {
  //   // this.activeTab = tab;
  // }

  // resetPreview(): void {
  //   // this.resetLoading = true;
  //   // this.layout.resetBaseConfig();
  // }

  // submitPreview(): void {
  //   // this.configLoading = true;
  //   // this.layout.saveBaseConfig(this.model); // it will refresh the page
  // }
}
