import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import swal from 'sweetalert2';

import { Cuenta } from './cuenta';
import { Partida } from '../partida/partida';

import { CuentaService } from './cuenta.service';
import { PartidaService } from '../partida/partida.service';

@Component({
  selector: 'app-cuenta',
  templateUrl: './cuenta.component.html',
})
export class CuentaComponent implements OnInit {

  cuentaForm = new FormGroup({
    nombre: new FormControl(''),
    descripcion: new FormControl(''),
    nroCuenta: new FormControl(''),
    cuenta: new FormControl('0'),
    partida: new FormControl(''),
  });

  cuentaRest = new Cuenta();
  cuentas:Cuenta[] = [];
  partidas:Partida[] = [];
  partidaSelec:Partida = new Partida();
  partidaId:String = '0';

  constructor(
    private modalService: NgbModal,
    private cuentaService:CuentaService,
    private chdr:ChangeDetectorRef,
    private partidaService:PartidaService
  ) { }

  ngOnInit(): void {
    this.listadoCuentas()
    this.listadoPartidas()

    // this.cuentaForm = this.for
  }

  listadoCuentas(){
    this.cuentaService.getCuentas().subscribe(resul => {
      this.cuentas = resul;
      this.chdr.detectChanges()
    })
  }

  listadoPartidas(){
    this.partidaService.getPartidas().subscribe(result => {
      this.partidas = result
    })
  }

  guardar(){
    let id = String(this.cuentaForm.value.partida)
    this.partidaService.getPartida(id).subscribe(resul => {
      const cuentaNew       = new Cuenta();
      cuentaNew.nombre      = String(this.cuentaForm.value.nombre);
      cuentaNew.descripcion = String(this.cuentaForm.value.descripcion);
      cuentaNew.nroCuenta   = String(this.cuentaForm.value.nroCuenta);
      cuentaNew.partida     = resul
      if(Number(this.cuentaForm.value.cuenta) === 0){
        this.cuentaService.createCuenta(cuentaNew).subscribe(resul =>{
          this.listadoCuentas()
        })
      }else{
        cuentaNew.idcuenta = String(this.cuentaForm.value.cuenta)
        this.cuentaService.upDate(cuentaNew).subscribe(result => {
          this.listadoCuentas()
        })
      }

      swal.fire({
        icon: 'success',
        title: 'Exito!',
        text: 'Se registro con exito la cuenta',
        timer: 1000
      })

      setTimeout(() => {
        this.modalService.dismissAll('content')
      }, 1500);
    })
  }

  openModal(content:any, cuenta:Cuenta){
    this.cuentaForm.get('cuenta')?.setValue((cuenta.idcuenta)? cuenta.idcuenta.toString() : '0');
    this.cuentaForm.get('nombre')?.setValue(cuenta.nombre.toString());
    this.cuentaForm.get('descripcion')?.setValue(cuenta.descripcion.toString());
    this.cuentaForm.get('nroCuenta')?.setValue(cuenta.nroCuenta.toString());
    this.cuentaForm.get('partida')?.setValue(cuenta.partida.idpartida.toString());
    this.partidaId = cuenta.partida.idpartida.toString();

    this.modalService.open(content, { size: 'lg' }).result.then(
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

  eliminarComponente(cuenta:Cuenta){
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
        this.cuentaService.deleteCuenta(cuenta.idcuenta).subscribe(result=>{
          this.listadoCuentas()
          swal.fire({
            icon: 'success',
            title: 'Eliminado!',
            text: 'La cuenta se elimino!',
            timer: 1500
          })
        })
      }
    })
  }

}
