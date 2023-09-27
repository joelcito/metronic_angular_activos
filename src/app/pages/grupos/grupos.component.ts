import { Component, Input, OnInit, ChangeDetectorRef, NgZone } from '@angular/core';
import { ModalDismissReasons, NgbDatepickerModule, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormControl } from '@angular/forms';
import swal from 'sweetalert2';

import { Cuenta } from '../cuenta/cuenta';
import { Grupo } from './grupo';

import { CuentaService } from '../cuenta/cuenta.service';
import { GrupoService } from './grupo.service';
@Component({
  selector: 'app-grupos',
  templateUrl: './grupos.component.html',
})
export class GrupoComponent implements OnInit {

  grupos    : Grupo[];
  eliminado : Boolean = false;
  mostrar   : Boolean     = false;
  cuentas   : Cuenta[];
  botoAgrega: Boolean = true

  closeResult = '';

  grupoReset:Grupo = new Grupo();

  // @Input() grupo:Grupo = new Grupo();
  // @Input() grupoReset:Grupo = new Grupo();

  grupoForm = new FormGroup({
    idgrupo: new FormControl(''),
    descripcion: new FormControl(''),
    nroItems: new FormControl(''),
    vidaUtil: new FormControl(''),
    cuenta: new FormControl(''),
  });

  constructor(
    private grupoService: GrupoService,
    private modalService: NgbModal,
    private chdr:ChangeDetectorRef,
    private cuentaService:CuentaService
  ) {
  }

  ngOnInit(): void {
    this.validaBotonesAgregaEditar()
    this.cargarLista()
    this.listaCuentas()
  }

  listaCuentas(){
    this.cuentaService.getCuentas().subscribe(result =>{
      this.cuentas = result
    })
  }

  cargarLista(){
    this.grupoService.getGrupos().subscribe((result) => {
      this.grupos = result;
      this.chdr.detectChanges()
    });

    if(this.grupos){
      if(this.grupos.length > 0)
        this.mostrar = true
      else
        this.mostrar = false
    }

  }

  create(){
    let id = String(this.grupoForm.value.cuenta);
    if(id){
      this.cuentaService.getCuenta(id).subscribe(result => {
        const grupoNew = new Grupo();
        grupoNew.cuenta = result
        grupoNew.descripcion = String(this.grupoForm.value.descripcion);
        grupoNew.vidaUtil = String(this.grupoForm.value.vidaUtil)
        grupoNew.nroItems = String(this.grupoForm.value.nroItems)
        if(Number(this.grupoForm.value.idgrupo) === 0){
          this.grupoService.crearGrupo(grupoNew).subscribe(result => {
            this.cargarLista()
          })
        }else{
          grupoNew.idgrupo = String(this.grupoForm.value.idgrupo)
          this.grupoService.upDate(grupoNew).subscribe(result => {
            this.cargarLista()
          })
        }
      })
      swal.fire({
        icon: 'success',
        title: 'Exito!',
        text: 'Se registro con exito el grupo',
        timer: 1500
      })
    }else{
      swal.fire({
        icon: 'error',
        title: 'Error!',
        text: 'Debe seleccionar una cuenta',
        timer: 1500
      })
    }
    setTimeout(() => {
      this.modalService.dismissAll('content')
    }, 1500);
  }

  public delete(idgrupo:String) {
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
        this.grupoService.deleteGrupo(idgrupo).subscribe(resp => {
          this.grupos = this.grupos.filter(gru => gru.idgrupo !== idgrupo)
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

  openLg(content:any, grupo:Grupo){
    this.grupoForm.get('idgrupo')?.setValue(String((grupo.idgrupo?grupo.idgrupo:'0')))
    this.grupoForm.get('descripcion')?.setValue(String(grupo.descripcion))
    this.grupoForm.get('nroItems')?.setValue(String(grupo.nroItems))
    this.grupoForm.get('vidaUtil')?.setValue(String(grupo.vidaUtil))
    this.grupoForm.get('cuenta')?.setValue(String(grupo.cuenta?grupo.cuenta.idcuenta:''))

    this.modalService.open(content, { size: 'lg' }).result.then(
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

  validaBotonesAgregaEditar(){
    // para el boton de REGISTRO DE ACTIVO
    let   idpermiso = sessionStorage.getItem('tipoManejo');
    const rolSA     = "187"
    const rolA      = "188"
    const rolOUMDB  = "189"
    
    if(
        idpermiso !== rolSA && 
        idpermiso !== rolA && 
        idpermiso !== rolOUMDB
      ){
      this.botoAgrega  = false;
    }
  }



}
