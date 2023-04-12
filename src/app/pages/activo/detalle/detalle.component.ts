import { Component, OnInit, Input, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { formatDate } from '@angular/common';

import { ActivoService } from '../activo.service';
import { GrupoService } from '../../grupos/grupo.service';
import { SubGrupoService } from '../../grupos/sub-grupo/sub-grupo.service';
import { IncorporacionService } from '../../incorporacion/incorporacion.service';
import { UnidadManejoService } from '../../unidad-manejo/unidad-manejo.service';
import { RegimenService } from '../../regimen/regimen.service';
import { RegionalService } from '../../regional/regional.service';
import { CaracteristicaService } from '../../caracteristica/caracteristica.service';


import { Activo } from '../activo';
import { Grupo } from '../../grupos/grupo';
import { SubGrupo } from '../../grupos/sub-grupo/sub-grupo';
import { Incorporacion } from '../../incorporacion/incorporacion';
import { UnidadManejo } from '../../unidad-manejo/unidad-manejo';
import { Regimen } from '../../regimen/regimen';
import { Regional } from '../../regional/regional';
import { Caracteristica } from '../../caracteristica/caracteristica';

@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.component.html',
})
export class DetalleComponent implements OnInit {

  @Input() activo: Activo = new Activo();

  grupos           :Grupo[];
  subGrupos        :SubGrupo[];
  incorporaciones  :Incorporacion[];
  unidadManejos    :UnidadManejo[];
  regimenes        :Regimen[];
  regionales       :Regional[];
  caracteristicas  :Caracteristica[];

  idGrupo         :String = '0';
  idSubGrupo      :String = '0';
  idregimen       :String = '0';
  idregional      :String = '0';
  idunidadmanejo  :String = '0';


  constructor(
    private activatedRoute: ActivatedRoute,
    private activoService: ActivoService,
    private chdr:ChangeDetectorRef,
    private grupoService: GrupoService,
    private subGrupoService:SubGrupoService,
    private incorporacionService:IncorporacionService,
    private unidadMaejoService:UnidadManejoService,
    private regimenService:RegimenService,
    private regionalService:RegionalService,
    private caracteristicaService:CaracteristicaService

  ) { }

  ngOnInit(){
    this.cargarActivo();
    this.listaGrupos();
    this.listaSubGrupos();
    this.listaRegimen();
    this.listaRegional();
    this.listaUnidadManejos();
  }

  cargarActivo() {
    this.activatedRoute.params.subscribe(params => {
      let id = params['id']
      if(id){
        this.activoService.getActivo(id.toString()).subscribe(activo => {
          this.activo = activo;
          // console.log("este = ",activo)
          if(activo.grupo){
            this.idGrupo = activo.grupo.idgrupo;
            let idgrupoB = activo.grupo.idgrupo.toString();
            this.subGrupoService.getSubGruposByIdGrupo(idgrupoB).subscribe(result =>{
              this.subGrupos = result;
              this.chdr.detectChanges();
            })
          }

          if(activo.subgrupo){
            this.idSubGrupo = activo.subgrupo.idsubgrupo
          }

          if(activo.regimen){
            this.idregimen = activo.regimen.idregimen
          }

          if(activo.regional){
            this.idregional = activo.regional.idregional
          }

          if(activo.unidadmanejo){
            this.idunidadmanejo = activo.unidadmanejo.idunidadmanejo;
          }
          this.chdr.detectChanges();
        })

        this.caracteristicaService.getCaracteristicasByIdActivo(id).subscribe(res => {
          this.caracteristicas = res;
          console.log(this.caracteristicas,res)
          // this.chdr.detectChanges();
        })

        console.log(this.caracteristicas)

      }else{
        console.log("n che");
      }
    })
  }

  listaGrupos(){
    this.grupoService.getGrupos().subscribe(resul =>{
      this.grupos = resul;
      this.chdr.detectChanges();
    })
  }

  listaSubGrupos(){
    this.subGrupoService.getSubGrupos().subscribe(resul =>{
      this.subGrupos = resul;
      this.chdr.detectChanges();
    })
  }

  listaIncorporacion(){
    this.incorporacionService.getIncorporaciones().subscribe(resul =>{
      this.incorporaciones = resul;
      this.chdr.detectChanges();
    })
  }

  listaUnidadManejos(){
    this.unidadMaejoService.getUnidadManejos().subscribe(resul =>{
      this.unidadManejos = resul;
      this.chdr.detectChanges();
    })
  }

  listaRegimen(){
    this.regimenService.getRegimenes().subscribe(resul =>{
      this.regimenes = resul;
      this.chdr.detectChanges();
    })
  }

  listaRegional(){
    this.regionalService.getRegionales().subscribe(resul=>{
      this.regionales = resul;
      this.chdr.detectChanges();
    })
  }

  onChangeDate(value:any) {
    console.log(value)
    // this.myDate = new Date(value);
  }

}
