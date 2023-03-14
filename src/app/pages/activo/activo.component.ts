import { Component, OnInit, ViewChild } from '@angular/core';
// import { NgForm } from '@angular/forms';
// import { LayoutService } from '../../_metronic/layout';

// type Tabs = 'Sidebar' | 'Header' | 'Toolbar';

// PARA LOS SERVICIOS
// import { ActivoModule } from './activo.module';
import { ActivoService } from './activo.service';
import { Activo } from './activo';
import { map, mergeMap } from 'rxjs';

@Component({
  selector: 'app-activo',
  templateUrl: './activo.component.html',
})

// export class ActivoComponent{
export class ActivoComponent implements OnInit {
// export class BuilderComponent implements OnInit {
  // activeTab: Tabs = 'Sidebar';
  // model: any;
  // @ViewChild('form', { static: true }) form: NgForm;
  // configLoading: boolean = false;
  // resetLoading: boolean = false;

  // activos: Activo[] = {idactivo:1};
  activos: Activo[] = [];

  public varPrueb:String = "Haber" ;

  constructor(
    // private layout: LayoutService,

    private activoService: ActivoService
  ){
  }

  ngOnInit(){
    this.cargar()
  }
  cargar(){
    console.log("antes de cargar")
    this.activoService.getActivos().subscribe(
      (activos) => {
        this.activos = activos
        console.log(this.activos)
      }
    )
    console.log("terminando de cargar")
  }

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
