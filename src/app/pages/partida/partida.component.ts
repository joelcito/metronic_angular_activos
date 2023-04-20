import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormControl } from '@angular/forms';
import swal from 'sweetalert2';


import { Partida } from './partida';

import { PartidaService } from './partida.service';

@Component({
  selector: 'app-partida',
  templateUrl: './partida.component.html',
})
export class PartidaComponent implements OnInit {

  partidaReset = new Partida();
  partidas:Partida[] = [];

  partidaForm = new FormGroup({
    partida: new FormControl('0'),
    descripcion: new FormControl(''),
    nombre: new FormControl(''),
    debe: new FormControl(''),
    haber: new FormControl(''),
  });

  constructor(
    private modalService: NgbModal,
    private partidaService:PartidaService,
    private chdr:ChangeDetectorRef,
  ) { }

  ngOnInit(): void {
    this.listadoPartidas();
  }

  listadoPartidas(){
    this.partidaService.getPartidas().subscribe(result => {
      this.partidas = result;
      this.chdr.detectChanges()
    })
  }
  guardar(){

    const partidaNew = new Partida();

    partidaNew.nombre = String(this.partidaForm.value.nombre);
    partidaNew.descripcion = String(this.partidaForm.value.descripcion);
    partidaNew.debe = String(this.partidaForm.value.debe);
    partidaNew.haber = String(this.partidaForm.value.haber);

    if(Number(this.partidaForm.value.partida) === 0){
      this.partidaService.createPartida(partidaNew).subscribe(result => {
        this.listadoPartidas()
      })
    }else{
      partidaNew.idpartida = String(this.partidaForm.value.partida);
      this.partidaService.upDate(partidaNew).subscribe(resu => {
        this.listadoPartidas()
      })
    }
    swal.fire({
      icon: 'success',
      title: 'Exito!',
      text: 'Se registro con exito la partida',
      timer: 1000
    })

    setTimeout(() => {
      this.modalService.dismissAll('content')
    }, 1500);

  }

  openModal(content:any ,partida:Partida){

    this.partidaForm.get('partida')?.setValue(((partida.idpartida)? partida.idpartida.toString() : '0'));
    this.partidaForm.get('nombre')?.setValue(String(partida.nombre));
    this.partidaForm.get('descripcion')?.setValue(String(partida.descripcion));
    this.partidaForm.get('debe')?.setValue(String(partida.debe));
    this.partidaForm.get('haber')?.setValue(String(partida.haber));

    this.modalService.open(content, { size: '' }).result.then(
      (result) => {
        if(result==='guardar'){
          console.log("se guardara");
        }else{
          console.log("no guardara");
        }
        console.log(result)
      },
      (reason)=>{
        console.log(reason)
      }
    );
    // this.componenteForm.get('subgrupo')?.setValue(this.idSubGrupo.toString());
  }

  eliminarComponente(partida:Partida){
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
        this.partidaService.deletePartida(partida.idpartida).subscribe(result=>{
          this.listadoPartidas();
          swal.fire({
            icon: 'success',
            title: 'Eliminado!',
            text: 'La Partida se elimino!',
            timer: 1500
          })
        })
      }
    })
  }

}
