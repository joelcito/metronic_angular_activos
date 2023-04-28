import { Component, OnInit, ViewChild, ChangeDetectorRef, Input, ElementRef } from '@angular/core';
import { ModalDismissReasons, NgbDatepickerModule, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgForm, FormGroup, FormControl } from '@angular/forms';

import { Activo } from './activo';
import { Grupo } from '../grupos/grupo';
import { SubGrupo } from '../grupos/sub-grupo/sub-grupo';
import { Componente } from '../grupos/sub-grupo/componente/componente';
import { Incorporacion } from '../incorporacion/incorporacion';
import { UnidadManejo } from '../unidad-manejo/unidad-manejo';
import { Regimen } from '../regimen/regimen';
import { Regional } from '../regional/regional';
import { Caracteristica } from '../caracteristica/caracteristica';

import { ActivoService } from './activo.service';
import { GrupoService } from '../grupos/grupo.service';
import { SubGrupoService } from '../grupos/sub-grupo/sub-grupo.service';
import { ComponenteService } from '../grupos/sub-grupo/componente/componente.service';
import { IncorporacionService } from '../incorporacion/incorporacion.service';
import { UnidadManejoService } from '../unidad-manejo/unidad-manejo.service';
import { RegimenService } from '../regimen/regimen.service';
import { RegionalService } from '../regional/regional.service';
import { CaracteristicaService } from '../caracteristica/caracteristica.service';
import { UfvService } from '../ufv/ufv.service';

import swal from 'sweetalert2';
import { map } from 'rxjs';

@Component({
  selector: 'app-activo',
  // standalone: true,
  // imports: [NgbDatepickerModule],
  templateUrl: './activo.component.html',
})

// export class ActivoComponent{
export class ActivoComponent implements OnInit {
  model: any;
  @ViewChild('form', { static: true }) form: NgForm;

  configLoading: boolean = false;
  resetLoading: boolean = false;
  tabla: boolean = false;

  // activos1: any = [];
  activos: Activo[];
  grupos: Grupo[];
  subGrupos: SubGrupo[];
  subGruposBuscados: SubGrupo[];
  componentes: Componente[];
  componentesView:Boolean = false;
  incorporaciones:Incorporacion[];
  unidadManejos:UnidadManejo[];
  regimenes:Regimen[];
  regionales:Regional[];

  idsComponentes:String[] = [];

  valorComponente:String = "";

  componente = {};
  jsonComponente = [];
  estados:String[] = [];
  estadosValores:String[] = [];

  closeResult = '';

  data:any = [];

  codRegional:String = "";
  codRegimen:String = "";
  codGrupo:String = "";
  codCorrelativo:String = "";

  maxValFecha:String;


  activosPer: any[] = [];


  @Input() ActivoDevuelto:Activo = new Activo();

  @Input() activo: Activo = new Activo();
  @Input() caracteristica:Caracteristica = new Caracteristica();

  activoForm = new FormGroup({
    descripcion: new FormControl(''),
    incorporacion: new FormControl(''),
    grupo: new FormControl(''),
    subgrupo: new FormControl(''),
    codigo: new FormControl(''),
    regimen: new FormControl(''),
    regional: new FormControl(''),
    unidadmanejo: new FormControl(''),
    eficiencia: new FormControl(''),
    formainicial:new FormControl(''),
    estadoregistro:new FormControl(''),
    fechacompra:new FormControl(''),
    precio:new FormControl(''),
    ufvcompra:new FormControl(''),
    porcentaje_depreciacion:new FormControl(''),
    vida_util:new FormControl(''),
    placa:new FormControl(''),
    estado:new FormControl(''),

    // componentes:new FormControl([]),
  });

  public codigoInput = new FormControl('');

  constructor(
    private activoService: ActivoService,
    private modalService: NgbModal,
    private chdr:ChangeDetectorRef,
    private grupoService: GrupoService,
    private subGrupoService:SubGrupoService,
    private componenteService:ComponenteService,
    private incorporacionService:IncorporacionService,
    private unidadMaejoService:UnidadManejoService,
    private regimenService:RegimenService,
    private regionalService:RegionalService,
    private caracteristicaService:CaracteristicaService,
    private ufvService:UfvService

  ){
  }

  ngOnInit(){
    //this.listaActivos()
    this.listaGrupos()
    this.listaSubGrupos()
    this.listaIncorporacion()
    this.listaUnidadManejos()
    this.listaRegimen()
    this.listaRegional()

    this.maxValFecha = new Date().toISOString().substring(0,10)

    this.activoService.listarParsonalizado().subscribe(resul => {
      console.log(resul)
      this.activosPer = resul
      this.chdr.detectChanges()
    })

    
  }

  listaActivos(){
    this.activoService.getActivos().subscribe(result => {
      this.activos = result
      console.log(this.activos);
      this.chdr.detectChanges()
    })
  }

  listaGrupos(){
    this.grupoService.getGrupos().subscribe(resul =>{
      this.grupos = resul;
    })
  }

  listaSubGrupos(){
    this.subGrupoService.getSubGrupos().subscribe(resul =>{
      this.subGrupos = resul;
    })
  }

  listaIncorporacion(){
    this.incorporacionService.getIncorporaciones().subscribe(resul =>{
      this.incorporaciones = resul;
    })
  }

  listaUnidadManejos(){
    this.unidadMaejoService.getUnidadManejos().subscribe(resul =>{
      this.unidadManejos = resul;
    })
  }

  listaRegimen(){
    this.regimenService.getRegimenes().subscribe(resul =>{
      this.regimenes = resul;
    })
  }

  listaRegional(){
    this.regionalService.getRegionales().subscribe(resul=>{
      this.regionales = resul;
    })
  }

  buscaSubGruposPorGrupo(id:String) {

    console.log(id.trim())
    this.subGrupoService.getSubGruposByIdGrupo(id.toString().trim()).subscribe(resul =>{
      this.subGruposBuscados = resul;
    })
  }
  buscarSubGrupo($evento:any){
    this.buscaSubGruposPorGrupo(this.activo.grupo.idgrupo);
    this.codGrupo = this.activo.grupo.idgrupo;
    let nueCodNew = String("COS-"+this.codRegional+"-"+this.codRegimen+"-"+this.codGrupo+"-151");
    this.activoForm.get('codigo')?.setValue(nueCodNew);
    this.componentesView = false;

    // console.log(this.activo.grupo)
    this.activo.vida_util                 = this.activo.grupo.vidaUtil.toString()
    this.activo.porcentaje_depreciacion   = String(100/Number(this.activo.grupo.vidaUtil))

    this.grupoService.getCuentaPartidaByIdGrupo(this.activo.grupo.idgrupo).subscribe(resul => {
      (document.querySelector('#cuentaContableId') as HTMLInputElement).value = resul.cuenta_id;
      (document.querySelector('#cuentaContableDescripcion') as HTMLInputElement).value = resul.des1;
      (document.querySelector('#partidaContableId') as HTMLInputElement).value = resul.cod1;
      (document.querySelector('#partidaContableDescipcion') as HTMLInputElement).value = resul.des2;
    })
  }

  buscarComponentePorSubGrupo(id:String){
    this.componenteService.getComponenteByIdSubGrupo(id.toString()).subscribe(resul =>{
      this.componentes = resul;
      for (let index = 0; index < resul.length; index++) {
        const element = resul[index];
        this.estados.push(element.estado);
        this.idsComponentes.push(element.idcomponente);
      }
    })
  }
  listarComponentes($evento:any){
    this.buscarComponentePorSubGrupo(this.activo.subgrupo.idsubgrupo)
    this.componentesView = true;
  }

  openModal(content:any){
    // this.grupo.idgrupo     = grupo.idgrupo
    // this.grupo.descripcion = grupo.descripcion
    // this.grupo.nroItems    = grupo.nroItems
    // this.grupo.vidaUtil    = grupo.vidaUtil

    this.modalService.open(content, { size: 'xl' }).result.then(
      (result) => {
        if(result==='guardar'){
          console.log("se guardara");
        }else{
          console.log("no guardara");
        }

        //
        console.log("haber")

      },
      (reason)=>{
        console.log(reason)
      }
    );
  }

  // open(content:any) {
	// 	this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then(
	// 		(result) => {
	// 			this.closeResult = `Closed with: ${result}`;
	// 		},
	// 		(reason) => {
	// 			this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
	// 		},
	// 	);
	// }

	private getDismissReason(reason: any): string {
		if (reason === ModalDismissReasons.ESC) {
			return 'by pressing ESC';
		} else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
			return 'by clicking on a backdrop';
		} else {
			return `with: ${reason}`;
		}
	}

  createActivo(){
    this.activoService.create(this.activo).subscribe(resul => {

      let datos:String = "";

      for (let index = 0; index < this.estados.length; index++) {
        const element = this.estados[index];
        datos = datos + this.idsComponentes[index].toString()+"┬"+(<HTMLInputElement>document.querySelector('#'+element)).value;

        if(index < (this.estados.length)-1){
          datos = datos + "┴";
        }else{
          datos = datos+"┴"+resul.idactivo ;
        }
      }

      this.caracteristicaService.agregaJson(datos).subscribe(result => {
      })

      this.listaActivos();

      swal.fire({
        icon: 'success',
        title: 'Exito!',
        text: 'Se gurado con exito el Activo',
        timer: 1500
      })

    });
  }

  eliminarActivo(activo:Activo){
    swal.fire({
      title: 'Estas seguro de eliminar?',
      text: "No podras revertir este cambio!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, eliminar!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.activoService.delete(activo.idactivo.toString()).subscribe(resp => {
          this.activos = this.activos.filter(act => act.idactivo !== activo.idactivo)
          this.chdr.detectChanges()
          swal.fire(
            'Eliminado!',
            'El grupo se elimino.',
            'success'
          )
        })
      }
    })
  }

  generaCodRegimen(){
    let dato = JSON.parse(JSON.stringify(this.activoForm.value.regimen)).idregimen;
    this.codRegimen = dato;
    let nueCodNew = String("COS-"+this.codRegional+"-"+dato+"-"+this.codGrupo+"-151");
    this.activoForm.get('codigo')?.setValue(nueCodNew);
  }

  generaCodRegional(){
    let dato = JSON.parse(JSON.stringify(this.activoForm.value.regional)).idregional;
    this.codRegional = dato;
    let nueCodNew = String("COS-"+dato+"-"+this.codRegimen+"-"+this.codGrupo+"-151");
    this.activoForm.get('codigo')?.setValue(nueCodNew);
  }

  sacaUfv(){
    if(this.activoForm.value.fechacompra){
      let fecha = (this.activoForm.value.fechacompra)?.toString() ;
      if(fecha){
        this.ufvService.getUfvByFecha(fecha).subscribe(res => {
          if(res){
            this.activoForm.get('ufvcompra')?.setValue(String(res.valor));
          }else{
            console.log("denotr del sub cribes")
          }
        })
      }
    }
  }

  buscarActivo(codActivo:String, descripcionActivo:String){
     this.activoService.buscarActivo(codActivo,descripcionActivo).subscribe(res => {
      this.activosPer = res
      console.log(res)
      this.chdr.detectChanges()
     })
  }

  convertirMayusculas(valor: any){
    
  }
}
