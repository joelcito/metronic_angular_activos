import { Component, OnInit, ChangeDetectorRef } from '@angular/core';

import { Incorporacion } from './incorporacion';

import { IncorporacionService } from './incorporacion.service';

@Component({
  selector: 'app-incorporacion',
  templateUrl: './incorporacion.component.html',
})
export class IncorporacionComponent implements OnInit {

  incorporaciones:Incorporacion[] = [];

  constructor(
    private incorporacionService:IncorporacionService,
    private chdr:ChangeDetectorRef,
  ) { }

  ngOnInit(): void {
    this.listadoIncorporaciones()
  }

  listadoIncorporaciones(){
    this.incorporacionService.getIncorporaciones().subscribe(resul => {
      this.incorporaciones = resul;
      this.chdr.detectChanges()
    })
  }

}
