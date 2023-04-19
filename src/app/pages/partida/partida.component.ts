import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormControl } from '@angular/forms';


import { Partida } from './partida';

@Component({
  selector: 'app-partida',
  templateUrl: './partida.component.html',
})
export class PartidaComponent implements OnInit {

  partidaReset = new Partida();

  partidaForm = new FormGroup({
    // componente: new FormControl('0'),
    // nombre: new FormControl(''),
    // subgrupo: new FormControl(''),
    // estado: new FormControl(''),
  });

  constructor(
    private modalService: NgbModal,
  ) { }

  ngOnInit(): void {
  }

  guardar(){

  }

  openModal(content:any ,partida:Partida){
    // this.componenteForm.get('componente')?.setValue((componente.idcomponente)? componente.idcomponente.toString() : '0');
    // this.componenteForm.get('nombre')?.setValue(componente.nombre.toString());
    // this.componenteForm.get('estado')?.setValue(componente.estado.toString());

    this.modalService.open(content, { size: '' }).result.then(
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
    // this.componenteForm.get('subgrupo')?.setValue(this.idSubGrupo.toString());
  }

}
