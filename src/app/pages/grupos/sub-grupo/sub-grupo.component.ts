import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormControl } from '@angular/forms';
import swal from 'sweetalert2';


import { SubGrupoService } from './sub-grupo.service';
import { GrupoService } from '../grupo.service';

import { SubGrupo } from './sub-grupo';
import { Grupo } from '../grupo';

@Component({
  selector: 'app-sub-grupo',
  templateUrl: './sub-grupo.component.html',
})
export class SubGrupoComponent implements OnInit {

  subGrupos:SubGrupo [] = [];
  subGrupoReset = new SubGrupo();
  grupo = new Grupo();

  subGrupoForm = new FormGroup({
    descripcion: new FormControl(''),
    subgrupo: new FormControl(''),
  });

  constructor(
    private subGrupoService: SubGrupoService,
    private chdr:ChangeDetectorRef,
    private activatedRoute: ActivatedRoute,
    private modalService: NgbModal,
    private grupoService: GrupoService
  ) { }

  ngOnInit(): void {
    this.cargarListaSubGrupo();
  }

  cargarListaSubGrupo(){
    this.activatedRoute.params.subscribe(params => {
      let id = params['id'];
      if(id){
        this.subGrupoService.getSubGruposByIdGrupo(id.toString()).subscribe(result => {
          this.subGrupos = result
          this.chdr.detectChanges()
        })

        this.grupoService.getGrupoById(id).subscribe(result => {
          this.grupo = result
        })
      }
    })
  }

  openModal(content:any, subgrupo:SubGrupo){
    this.subGrupoForm.get('subgrupo')?.setValue((subgrupo.idsubgrupo)? subgrupo.idsubgrupo.toString() : '0')
    this.subGrupoForm.get('descripcion')?.setValue(subgrupo.descripcion.toString())
    this.modalService.open(content, { size: '' }).result.then(
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

  guardar(){
    const subGrupoNew = new SubGrupo();
    subGrupoNew.descripcion = String (this.subGrupoForm.value.descripcion)
    subGrupoNew.grupo = this.grupo;

    if(Number(this.subGrupoForm.value.subgrupo)===0){
      this.subGrupoService.createSubGrupo(subGrupoNew).subscribe(result => {
        this.cargarListaSubGrupo();
      })
    }else{
      subGrupoNew.idsubgrupo = String (this.subGrupoForm.value.subgrupo)
      this.subGrupoService.upDate(subGrupoNew).subscribe(result => {
        this.cargarListaSubGrupo();
      })
    }

    swal.fire({
      icon: 'success',
      title: 'Exito!',
      text: 'Se gurado con exito el sub grupo',
      timer: 1000
    })

    setTimeout(() => {
      this.modalService.dismissAll('content')
    }, 1500);
  }

  mayus(valor:String){
    this.subGrupoForm.get('descripcion')?.setValue(valor.toUpperCase())
  }

  eliminarSubGrupo(subGrupo:SubGrupo){
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
        this.subGrupoService.deleteSubGrupo(subGrupo.idsubgrupo).subscribe(result =>{
          this.cargarListaSubGrupo();
          swal.fire({
            icon: 'success',
            title: 'Eliminado!',
            text: 'El sub grupo se elimino!',
            timer: 1500
          })
        })
      }
    })
  }

}
