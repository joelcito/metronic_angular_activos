import { Component, OnInit, ChangeDetectorRef } from '@angular/core';

import { ModalDismissReasons, NgbDatepickerModule, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormControl } from '@angular/forms';
import { ProvedorService } from './provedor.service';



@Component({
  selector: 'app-provedor',
  templateUrl: './provedor.component.html',
})
export class ProvedorComponent implements OnInit {

  provedores:any[] = [];
  provedorReset = {
    des : '',
    cod : '',
    dir : '',
    tel : '',
    fax : '',
    email : '',
  }

  provedorForm = new FormGroup({
    nombre: new FormControl(''),
    nit: new FormControl(''),
    dirceccion: new FormControl(''),
    telefono: new FormControl(''),
    fax: new FormControl(''),
    email: new FormControl(''),
    provedor: new FormControl(''),
  });

  constructor(
    private modalService: NgbModal,
    private chdr:ChangeDetectorRef,
    private provedorService:ProvedorService
  ) { }

  ngOnInit(): void {
    this.listaProvedor();
  }

  // openLg(content:any, grupo:Grupo){
  openModal(content:any, provedor:any){
    this.provedorForm.get('provedor')?.setValue(String((provedor.cod?provedor.cod:'0')))
    this.provedorForm.get('nit')?.setValue(String((provedor.cod)))
    this.provedorForm.get('nombre')?.setValue(String(provedor.des))
    this.provedorForm.get('dirceccion')?.setValue(String(provedor.dir))
    this.provedorForm.get('telefono')?.setValue(String(provedor.tel))
    this.provedorForm.get('fax')?.setValue(String(provedor.fax))
    this.provedorForm.get('email')?.setValue(String(provedor.email))

    this.modalService.open(content, { size: 'lg' }).result.then(
      (result) => {
        if(result==='guardar'){
          console.log("se guardara");
        }else{
          console.log("no guardara");
        }
        console.log("haber")

      },
      (reason)=>{
        console.log(reason)
      }
    );
	}

  guardar(){
    console.log(this.provedorForm.value)
    let json = this.provedorForm.value
    this.provedorService.guardarProvedor(json).subscribe(result => {
      console.log(result)
    })
  }

  listaProvedor(){
    this.provedorService.getProvedoresTodo().subscribe(result =>{
      this.provedores = result
      this.chdr.detectChanges()
    })
  }
}
