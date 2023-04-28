import { Component, OnInit, Input, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { formatDate,DatePipe } from '@angular/common';
// import { map } from 'rxjs/operators';
import { FormGroup, FormControl } from '@angular/forms';



import { ActivoService } from '../activo.service';
import { GrupoService } from '../../grupos/grupo.service';
import { SubGrupoService } from '../../grupos/sub-grupo/sub-grupo.service';
import { IncorporacionService } from '../../incorporacion/incorporacion.service';
import { UnidadManejoService } from '../../unidad-manejo/unidad-manejo.service';
import { RegimenService } from '../../regimen/regimen.service';
import { RegionalService } from '../../regional/regional.service';
import { CaracteristicaService } from '../../caracteristica/caracteristica.service';
import { UfvService } from '../../ufv/ufv.service';


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

  // myObject: any;

  DepGes:string;
  ufvIni:string;
  ufvFin:string;
  precio:string;
  cantMes:string;
  ValorNeto:string;
  costoActual:string;


  PERDepGes:string;
  PERufvIni:string;
  PERufvFin:string;
  PERprecio:string;
  PERcantMes:string;
  PERValorNeto:string;
  PERcostoActual:string;


  defaultDate:String;
  fechaMin:String;
  valorFechaIni:String;
  depreValorMaxFechaFin:String;

  depreciacionForm = new FormGroup({
    depreActivoId: new FormControl(''),
    depreFechaIni: new FormControl(''),
    depreUfvIni: new FormControl(''),
    depreFechaFin: new FormControl(''),
    depreUfvFin: new FormControl(''),
  });

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
    private caracteristicaService:CaracteristicaService,
    private ufvService:UfvService,

    private datePipe:DatePipe

  ) { }

  ngOnInit(){
    this.cargarActivo();
    this.listaGrupos();
    this.listaSubGrupos();
    this.listaRegimen();
    this.listaRegional();
    this.listaUnidadManejos();

    this.defaultDate = new Date().toISOString().substring(0,10)
    // this.fechaMin = new Date().toISOString().substring(0,10)
    this.depreValorMaxFechaFin = new Date().toISOString().substring(0,10)


  }

  cargarActivo() {
    this.activatedRoute.params.subscribe(params => {
      let id = params['id']
      if(id){
        this.activoService.getActivo(id.toString()).subscribe(activo => {
          this.activo = activo;
          if(activo.grupo){
            this.idGrupo = activo.grupo.idgrupo;
            let idgrupoB = activo.grupo.idgrupo.toString();
            this.subGrupoService.getSubGruposByIdGrupo(idgrupoB).subscribe(result =>{
              this.subGrupos = result;
              this.chdr.detectChanges();
            })

            this.grupoService.getCuentaPartidaByIdGrupo(idgrupoB).subscribe(resul => {
              (document.querySelector('#cuentaContableId') as HTMLInputElement).value = resul.cuenta_id;
              (document.querySelector('#cuentaContableDescripcion') as HTMLInputElement).value = resul.des1;
              (document.querySelector('#partidaContableId') as HTMLInputElement).value = resul.cod1;
              (document.querySelector('#partidaContableDescipcion') as HTMLInputElement).value = resul.des2;
            })
          }
          // // valores para la depreciacion
          if(activo.fechacompra){
            this.valorFechaIni = new Date(activo.fechacompra.toString()).toISOString().substring(0,10);
          }
          this.depreciacionForm.get('depreFechaIni')?.setValue(String(this.valorFechaIni))
          this.depreciacionForm.get('depreUfvIni')?.setValue(String(activo.ufvcompra))
          this.depreciacionForm.get('depreActivoId')?.setValue(String(activo.idactivo))
          // // END valores para la depreciacion
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

            console.log(activo.unidadmanejo.idunidadmanejo)
            this.idunidadmanejo = activo.unidadmanejo.idunidadmanejo;
          }
          this.chdr.detectChanges();
        })

        this.caracteristicaService.getCaracteristicasByIdActivo(id).subscribe(res => {
          this.caracteristicas = res;
        })
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
  }

  calcularDepre(){

    this.activatedRoute.params.subscribe(params => {
      let id = params['id'];
      if(id){
        let fecha = (<HTMLInputElement>document.querySelector('#fechaValor')).value;
        this.activoService.calculaDepre(id,fecha.toString()).subscribe(resul => {
          this.DepGes       = resul.DepGes;
          this.ufvIni       = resul.ufvIni;
          this.ufvFin       = resul.ufvFin;
          this.precio       = resul.precio;
          this.cantMes      = resul.cantMes;
          this.ValorNeto    = resul.ValorNeto;
          this.costoActual  = resul.costoActual;
          this.chdr.detectChanges();
        })
      }
    })
  }

  calcularDeprePersonalizado(){
    let json =  JSON.stringify(this.depreciacionForm.value);
    this.activoService.calculaDepreModificable(json).subscribe(resul => {
      this.PERDepGes       = resul.DepGes;
      this.PERufvIni       = resul.ufvIni;
      this.PERufvFin       = resul.ufvFin;
      this.PERprecio       = resul.precio;
      this.PERcantMes      = resul.cantMes;
      this.PERValorNeto    = resul.ValorNeto;
      this.PERcostoActual  = resul.costoActual;
      this.chdr.detectChanges();
    })
  }

  sacaUfv(){
    if(this.depreciacionForm.value.depreFechaFin){
      let fecha = (this.depreciacionForm.value.depreFechaFin)?.toString() ;
      if(fecha){
        this.ufvService.getUfvByFecha(fecha).subscribe(res => {
          if(res){
            this.depreciacionForm.get('depreUfvFin')?.setValue(String(res.valor))
          }else{
            console.log("denotr del sub cribes")
          }
        })
      }
    }
  }
}
