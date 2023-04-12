import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormControl } from '@angular/forms';

import { SubGrupoService } from './sub-grupo.service';

import { SubGrupo } from './sub-grupo';

@Component({
  selector: 'app-sub-grupo',
  templateUrl: './sub-grupo.component.html',
})
export class SubGrupoComponent implements OnInit {

  subGrupos:SubGrupo [] = [];

  subGrupoForm = new FormGroup({
    nombre: new FormControl(''),
    subgrupo: new FormControl(''),
    estado: new FormControl(''),
  });

  constructor(
    private subGrupoService: SubGrupoService,
    private chdr:ChangeDetectorRef,
    private activatedRoute: ActivatedRoute,
    private modalService: NgbModal,
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
      }
    })
  }

  openModal(content:any){
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

  guardar(){
    console.log(this.subGrupoForm.value)
  }

}
