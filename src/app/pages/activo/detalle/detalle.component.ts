import { Component, OnInit, Input, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { formatDate,DatePipe } from '@angular/common';
// import { map } from 'rxjs/operators';
import { FormGroup, FormControl } from '@angular/forms';
import { ModalDismissReasons, NgbDatepickerModule, NgbModal } from '@ng-bootstrap/ng-bootstrap';

import swal from 'sweetalert2';


import { ActivoService } from '../activo.service';
import { GrupoService } from '../../grupos/grupo.service';
import { SubGrupoService } from '../../grupos/sub-grupo/sub-grupo.service';
import { IncorporacionService } from '../../incorporacion/incorporacion.service';
import { UnidadManejoService } from '../../unidad-manejo/unidad-manejo.service';
import { RegimenService } from '../../regimen/regimen.service';
import { RegionalService } from '../../regional/regional.service';
import { CaracteristicaService } from '../../caracteristica/caracteristica.service';
import { UfvService } from '../../ufv/ufv.service';
import { ProvedorService } from '../../provedor/provedor.service';


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
  provedores       :any[];
  listMovimientos  :any[];
  estadoActivo     :boolean;
  ultimoActivoMov  :any;
  listadoCargos   : any[];
  listadoUbiEsp   : any[];
  listadoreparticiones   : any[];
  listadoRefacciones   : any[];

  idGrupo         :String = '0';
  idSubGrupo      :String = '0';
  idregimen       :String = '0';
  idregional      :String = '0';
  idunidadmanejo  :String = '0';
  idcodprovedor   :String = '';

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

  buscaCedulaAsignacion:boolean = false;

  contenidoDepre:boolean = false;
  contenidoMovimiento:boolean = false;
  contenidoModificacion:boolean = false;

  depreciacionForm = new FormGroup({
    depreActivoId: new FormControl(''),
    depreFechaIni: new FormControl(''),
    depreUfvIni: new FormControl(''),
    depreFechaFin: new FormControl(''),
    depreUfvFin: new FormControl(''),
  });


  formularioLibreacion = new FormGroup({
    fecha: new FormControl(''),
    cargo: new FormControl(''),
    reparticion: new FormControl(''),
    ubicacion: new FormControl(''),
    descgeneral: new FormControl(''),
    destino: new FormControl(''),
    observacion: new FormControl(''),
    nombre: new FormControl(''),
    cedula: new FormControl(''),
    activo: new FormControl(''),
    ultimoMov: new FormControl(''),
    estadoregistro: new FormControl(''),
    tipo: new FormControl('LIB'),
  });

  formularioAsignacion = new FormGroup({
    fecha: new FormControl(''),
    cargo: new FormControl(''),
    reparticion: new FormControl(''),
    ubicacion: new FormControl(''),
    descgeneral: new FormControl(''),
    destino: new FormControl(''),
    observacion: new FormControl(''),
    nombre: new FormControl(''),
    cedula: new FormControl(''),
    activo: new FormControl(''),
    ultimoMov: new FormControl(''),
    estadoregistro: new FormControl(''),
    tipo: new FormControl('ASI'),
  });

  formularioModificacion = new FormGroup({
    descripcion: new FormControl(''),
    activo: new FormControl(''),
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

    private datePipe:DatePipe,
    private provedorService:ProvedorService,

    private modalService: NgbModal,

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

    this.listaProvedores();
  }

  listaMovimientos(id:String){
    this.activoService.listaMovimientosActivoById(id).subscribe(resul => {
      this.listMovimientos = resul
      this.chdr.detectChanges();
    })
  }

  sacaUltimoMovActivo(id:String){
    this.activoService.getUltimoMovActivo(id).subscribe(result => {
      console.log(result)
      this.ultimoActivoMov = result;
      this.chdr.detectChanges();
    })
  }

  cargarActivo() {
    this.activatedRoute.params.subscribe(params => {
      let id = params['id']
      if(id){
        this.activoService.getActivo(id.toString()).subscribe(activo => {
          this.activo = activo;
          // console.log(activo)
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

            // console.log(activo.unidadmanejo.idunidadmanejo)
            this.idunidadmanejo = activo.unidadmanejo.idunidadmanejo;
          }

          // PARA EL PROVEDOR
          if(activo.codprovedor){
            this.idcodprovedor = activo.codprovedor;
            this.provedorService.getProvedor(this.idcodprovedor).subscribe(resul => {
              const nitprovedor = document.getElementById('nitprovedor') as HTMLInputElement;
              nitprovedor.value = resul.cod.toString();
            })
          }

          this.chdr.detectChanges();
        })

        this.caracteristicaService.getCaracteristicasByIdActivo(id).subscribe(res => {
          this.caracteristicas = res;
        })

        // PARA LOS MOVIMIENTOS DE CADA ACTIVO
        this.listaMovimientos(id);
        this.sacaUltimoMovActivo(id);

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

  listaRefacciones(activo:string){
    this.activoService.getRefaccionesByIdActivo(activo).subscribe(result => {
      this.listadoRefacciones = result
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

  listaProvedores(){
    this.provedorService.getProvedoresTodo().subscribe(resul =>{
      this.provedores = resul;
      this.chdr.detectChanges();
    })
  }

  liberarActivo(content:any){
    this.activoService.getCargos().subscribe(result =>{
      this.listadoCargos = result;
    })
    this.activoService.getUbiEsp().subscribe(result =>{
      this.listadoUbiEsp = result;
    })
    this.formularioLibreacion.get('activo')?.setValue(String(this.activo.idactivo));
    this.formularioLibreacion.get('estadoregistro')?.setValue(String(this.activo.estadoregistro));
    if(this.ultimoActivoMov){
        // console.log(this.ultimoActivoMov);
      this.formularioLibreacion.get('ultimoMov')?.setValue(JSON.stringify(this.ultimoActivoMov));
    }
    this.activoService.getPersonaByCi(this.ultimoActivoMov.ci).subscribe(resul => {
      this.formularioLibreacion.get('cedula')?.setValue(String(resul.ci));
      this.formularioLibreacion.get('nombre')?.setValue(String(resul.des.trim())+" "+String(resul.des1.trim())+" "+String(resul.des2.trim()));
      // console.log(resul)
    })

    this.activoService.getReparticiones().subscribe(result => {
      // console.log(result)
    })

    this.modalService.open(content, { size: 'lg' }).result.then(
      (result) => {
        if(result==='guardar'){
          console.log("se guardara");
        }else{
          console.log("no guardara");
        }
        console.log("haber")
      },
      (reason)=>{
        console.log(reason)
      }
    );
  }

  guardarLiberacion(){
    let json = this.formularioLibreacion.value; 
    this.activoService.guardaLiberacionActivo(json).subscribe(resul => {
      if(resul.estado === "success"){
        this.listaMovimientos(resul.cod);
        this.sacaUltimoMovActivo(resul.cod);
        swal.fire({
          icon: 'success',
          title: 'Exito!',
          text: 'Se '+resul.mensaje+' con exito el activo',
          timer: 2000
        })
        setTimeout(() => {
          this.modalService.dismissAll('content')
        }, 2500);
      }else{
        swal.fire({
          icon: 'error',
          title: 'Error!',
          text: 'Algo paso con la liberacion',
          timer: 1000
        })
      }
    })
  }
  
  guardarAsignacion(){
    let json = this.formularioAsignacion.value; 

    console.log(json)

    this.activoService.guardaLiberacionActivo(json).subscribe(resul => {
      if(resul.estado === "success"){
        this.listaMovimientos(resul.cod);
        this.sacaUltimoMovActivo(resul.cod);
        swal.fire({
          icon: 'success',
          title: 'Exito!',
          text: 'Se '+resul.mensaje+' con exito el activo',
          timer: 2000
        })
        setTimeout(() => {
          this.modalService.dismissAll('content')
        }, 2500);
      }else{
        swal.fire({
          icon: 'error',
          title: 'Error!',
          text: 'Algo paso con la liberacion',
          timer: 1000
        })
      }
    })
  }

  abreModalAsignacion(modalAsignacion:any){

    this.activoService.getCargos().subscribe(result =>{
      this.listadoCargos = result;
    })
    this.activoService.getUbiEsp().subscribe(result =>{
      this.listadoUbiEsp = result;
    })
    this.formularioAsignacion.get('activo')?.setValue(String(this.activo.idactivo));
    this.formularioAsignacion.get('estadoregistro')?.setValue(String(this.activo.estadoregistro));
    if(this.ultimoActivoMov){
      // console.log(this.ultimoActivoMov);
      this.formularioAsignacion.get('ultimoMov')?.setValue(JSON.stringify(this.ultimoActivoMov));
    }

    // this.activoService.getPersonaByCi(this.ultimoActivoMov.ci).subscribe(resul => {
    //   this.formularioAsignacion.get('cedula')?.setValue(String(resul.ci));
    //   this.formularioAsignacion.get('nombre')?.setValue(String(resul.des.trim())+" "+String(resul.des1.trim())+" "+String(resul.des2.trim()));
    //   console.log(resul)
    // })

    this.modalService.open(modalAsignacion, { size: 'lg' }).result.then(
      (result) => {
        if(result==='guardar'){
          console.log("se guardara");
        }else{
          console.log("no guardara");
        }
        console.log("haber")
      },
      (reason)=>{
        console.log(reason)
      }
    );
  }

  buscarPersona(){

    var ci = String(this.formularioAsignacion.value.cedula);

    this.activoService.getPersonaByCi(ci).subscribe(result =>{

      console.log(result, Object.keys(result).length)

      if(Object.keys(result).length === 0){
        this.buscaCedulaAsignacion = true;
      }else{
        this.formularioAsignacion.get('nombre')?.setValue(result.des.trim()+" "+result.des1.trim()+" "+result.des2.trim());
        this.buscaCedulaAsignacion = false;
      }

      console.log(this.buscaCedulaAsignacion)
    })
  }

  visualizar(value:any){
    let btn = value.value
    if(btn === 'btnDepre'){
      this.contenidoDepre = true; 
      this.contenidoMovimiento = false; 
      this.contenidoModificacion = false; 
    }else if(btn === 'btnmovimiento'){
      this.contenidoMovimiento = true; 
      this.contenidoDepre = false; 
      this.contenidoModificacion = false; 
    }else if(btn === 'btnmodificacion'){
      let activo = (this.activo.idactivo).toString();
      this.listaRefacciones(activo)
      this.contenidoModificacion = true;
      this.contenidoMovimiento = false; 
      this.contenidoDepre = false; 
    }
  }

  abreModalModificacion(modalModificacion:any){
    this.formularioModificacion.get('activo')?.setValue(String(this.activo.idactivo));
    this.modalService.open(modalModificacion, { size: 'lg' }).result.then(
      (result) => {
        if(result==='guardar'){
          console.log("se guardara");
        }else{
          console.log("no guardara");
        }
        console.log("haber")
      },
      (reason)=>{
        console.log(reason)
      }
    );
  }

  guardarModificacion(){
    let json = this.formularioModificacion.value
    this.activoService.guardaRefaccion(json).subscribe(resul => {
      if(resul.estado === "success"){
        let activo = (this.activo.idactivo).toString();
        this.listaRefacciones(activo)
        swal.fire({
          icon: 'success',
          title: 'Exito!',
          text: 'Se regristro la refaccion con exito.',
          timer: 2000
        })
        setTimeout(() => {
          this.modalService.dismissAll('modalModificacion')
        }, 2500);
        this.formularioModificacion.get('descripcion')?.setValue('');
      }else{
        swal.fire({
          icon: 'error',
          title: 'Error!',
          text: 'Algo paso con en registro',
          timer: 1000
        })
      }
    })
  }
}
