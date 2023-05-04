import { Component, OnInit, ChangeDetectorRef } from '@angular/core';

import { Regimen } from './regimen';

import { RegimenService } from './regimen.service';

@Component({
  selector: 'app-regimen',
  templateUrl: './regimen.component.html',
})
export class RegimenComponent implements OnInit {

  regimenes:Regimen[];
  mostrar:Boolean = false;

  constructor(
    private regimenService:RegimenService,
    private chdr:ChangeDetectorRef,
  ) { }

  ngOnInit(): void {
    this.listaRegimenes()
  }

  listaRegimenes(){
    this.regimenService.getRegimenes().subscribe(result => {
      this.regimenes = result
      this.chdr.detectChanges()
    })
  }

}
