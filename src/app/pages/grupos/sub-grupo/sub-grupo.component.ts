import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { SubGrupoService } from './sub-grupo.service';

import { SubGrupo } from './sub-grupo';

@Component({
  selector: 'app-sub-grupo',
  templateUrl: './sub-grupo.component.html',
})
export class SubGrupoComponent implements OnInit {

  subGrupos:SubGrupo [] = [];

  constructor(
    private subGrupoService: SubGrupoService,
    private chdr:ChangeDetectorRef,
    private activatedRoute: ActivatedRoute,
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

}
