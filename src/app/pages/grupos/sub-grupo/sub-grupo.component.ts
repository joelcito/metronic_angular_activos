import { Component, OnInit } from '@angular/core';
import { SubGrupo } from './sub-grupo';
import { SubGrupoService } from './sub-grupo.service';

@Component({
  selector: 'app-sub-grupo',
  templateUrl: './sub-grupo.component.html',
})
export class SubGrupoComponent implements OnInit {

  subGrupos:SubGrupo [] = [];

  constructor(
    private subGrupoService: SubGrupoService
  ) { }

  ngOnInit(): void {

  }

  cargarListaSubGrupo(){
    this.subGrupoService.getSubGrupos().subscribe(res => {
      this.subGrupos 
    })
  }

}
