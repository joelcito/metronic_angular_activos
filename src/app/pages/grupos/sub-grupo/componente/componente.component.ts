import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormControl } from '@angular/forms';
import swal from 'sweetalert2';

import { Componente } from './componente';
import { SubGrupo } from '../sub-grupo';

import { ComponenteService } from './componente.service';
import { SubGrupoService } from '../sub-grupo.service';

@Component({
  selector: 'app-componente',
  templateUrl: './componente.component.html',
})
export class ComponenteComponent implements OnInit {

  componentes:Componente[] = [];
  cadena:String = "";
  idSubGrupo:String;
  subGrupoO = new SubGrupo();
  componenteReset = new Componente();

  componenteForm = new FormGroup({
    componente: new FormControl('0'),
    nombre: new FormControl(''),
    subgrupo: new FormControl(''),
    estado: new FormControl(''),
  });

  constructor(
    private activatedRoute: ActivatedRoute,
    private componenteService:ComponenteService,
    private chdr:ChangeDetectorRef,
    private modalService: NgbModal,
    private subGrupoService: SubGrupoService
  ) { }

  ngOnInit(): void {
    this.listadoComponentes()
  }

  listadoComponentes(){
    this.activatedRoute.params.subscribe(params =>{
      let idsubgrupo = params['idsubgrupo'];
      this.idSubGrupo = idsubgrupo;
      this.componenteService.getComponenteByIdSubGrupo(idsubgrupo).subscribe(res => {
        this.componentes = res;
        this.chdr.detectChanges()
      })

      this.subGrupoService.getSubGrupoById(idsubgrupo).subscribe(res => {
        this.subGrupoO = res;
      })
    })
  }

  openModal(content:any, componente:Componente){

    // console.log(this.modalService.open(content));
    this.modalService.dismissAll(content)

    this.componenteForm.get('componente')?.setValue((componente.idcomponente)? componente.idcomponente.toString() : '0');
    this.componenteForm.get('nombre')?.setValue(componente.nombre.toString());
    this.componenteForm.get('estado')?.setValue(componente.estado.toString());

    this.modalService.open(content, { size: 'xl' }).result.then(
      (result) => {
        if(result==='guardar'){
          console.log("se guardara");
        }else{
          console.log("no guardara");
        }

        //
        console.log(result)

      },
      (reason)=>{
        console.log(reason)
      }
    );
    this.componenteForm.get('subgrupo')?.setValue(this.idSubGrupo.toString());
  }

  haber($event:any){
    console.log($event.target.value);
  }

  onInputChange(value:any) {
    console.log(value.value);
  }

  mostrarEnInput2(valor: string) {
    const input1 = document.querySelector('#input1') as HTMLInputElement;
    input1.value = valor.toUpperCase();
    this.componenteForm.get('estado')?.setValue(input1.value.toLowerCase().replace(/ /g,'_'));
  }

  guardar(){

    const com = new Componente();
    com.nombre = String (this.componenteForm.value.nombre);
    com.estado = String (this.componenteForm.value.estado);
    com.subgrupo = this.subGrupoO;

    if(Number(this.componenteForm.value.componente) === 0){
      this.componenteService.createComponente(com).subscribe(result=>{
        this.listadoComponentes();
      })
    }else{
      com.idcomponente = String (this.componenteForm.value.componente);
      this.componenteService.upDate(com).subscribe(result=>{
        this.listadoComponentes();
      })
    }

    swal.fire({
      icon: 'success',
      title: 'Exito!',
      text: 'Se gurado con exito el componente',
      timer: 1000
    })

    setTimeout(() => {
      this.modalService.dismissAll('content')
    }, 1500);

  }
  eliminarComponente(componente:Componente){
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
        this.componenteService.deleteComponente(componente.idcomponente).subscribe(result=>{
          this.listadoComponentes();
          swal.fire({
            icon: 'success',
            title: 'Eliminado!',
            text: 'El componente se elimino!',
            timer: 1500
          })
        })
      }
    })
  }
}
