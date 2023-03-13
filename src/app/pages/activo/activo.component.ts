import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { LayoutService } from '../../_metronic/layout';

type Tabs = 'Sidebar' | 'Header' | 'Toolbar';



// PARA LOS SERVICIOS
// import { ActivoModule } from './activo.module';
import { ActivoService } from './activo.service';
import { Activo } from './activo';



@Component({
  selector: 'app-activo',
  templateUrl: './activo.component.html',
})

export class ActivoComponent implements OnInit {
// export class BuilderComponent implements OnInit {
  activeTab: Tabs = 'Sidebar';
  model: any;
  @ViewChild('form', { static: true }) form: NgForm;
  configLoading: boolean = false;
  resetLoading: boolean = false;

  // activos: Activo[] = {idactivo:1};
  activos: Activo[] = [];

  public varPrueb:String = "Haber" ;

  constructor(
    private layout: LayoutService,
    private activoService: ActivoService
  ){
    console.log("ahora este contructor ",this.activos)
  }

  ngOnInit(): void {

    this.model = this.layout.getLayoutConfig(
      this.layout.getBaseLayoutTypeFromLocalStorage()
    );

    // console.log(this.activos);
    this.activoService.getActivos().subscribe(
      (activos) => {
        console.log("antes de darle")
        this.activos = activos
        console.log("este che => ",this.activos, activos[0].descripcion)
        console.log("ya termino")
      }
    );

    // console.log("ahora este =Z ",this.activos[0].idactivo)

    console.log("ahora este terminando del oninit ",this.activos)

  }

  setActiveTab(tab: Tabs) {
    // this.activeTab = tab;
  }

  resetPreview(): void {
    // this.resetLoading = true;
    // this.layout.resetBaseConfig();
  }

  submitPreview(): void {
    // this.configLoading = true;
    // this.layout.saveBaseConfig(this.model); // it will refresh the page
  }
}
