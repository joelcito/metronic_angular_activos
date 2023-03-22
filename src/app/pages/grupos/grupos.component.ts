import { Component, Input, OnInit, ChangeDetectorRef, NgZone } from '@angular/core';
import { Grupo } from './grupo';
import { GrupoService } from './grupo.service';

import { ModalDismissReasons, NgbDatepickerModule, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormControl } from '@angular/forms';
import swal from 'sweetalert2';
@Component({
  selector: 'app-grupos',
  templateUrl: './grupos.component.html',
})
export class GrupoComponent implements OnInit {

  // grupos:any[] = [];
  grupos:Grupo[];
  eliminado:Boolean = false;
  closeResult = '';

  @Input() grupo:Grupo = new Grupo();
  @Input() grupoReset:Grupo = new Grupo();

  grupoForm = new FormGroup({
    idgrupo: new FormControl(''),
    descripcion: new FormControl(''),
    nroItems: new FormControl(''),
    vidaUtil: new FormControl(''),
  });

  constructor(
    private grupoService: GrupoService,
    private modalService: NgbModal,
    private chdr:ChangeDetectorRef
  ) {
  }

  ngOnInit(): void {
    this.cargarLista()
  }

  cargarLista(){
    this.grupoService.getGrupos().subscribe((result) => {
      this.grupos = result;
      this.chdr.detectChanges()
    });
  }

  create(){
    if(this.grupo.idgrupo){
      console.log("si")
      this.grupoService.upDate(this.grupo).subscribe(result => {
        this.cargarLista();
      })
    }else{
      console.log("no")
      this.grupoService.crearGrupo(this.grupo).subscribe((grupo) => {
        this.cargarLista();
      })
    }
    swal.fire({
      icon: 'success',
      title: 'Exito!',
      text: 'Se gurado con exito con exito',
      timer: 1500
    })
  }

  public delete(idgrupo:String) {
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
        this.grupoService.deleteGrupo(idgrupo).subscribe(resp => {
          this.grupos = this.grupos.filter(gru => gru.idgrupo !== idgrupo)
          this.chdr.detectChanges()
          swal.fire(
            'Eliminado!',
            'El grupo se elimino.',
            'success'
          )
        })
      }
    })
  }

  openLg(content:any, grupo:Grupo){

    this.grupo.idgrupo     = grupo.idgrupo
    this.grupo.descripcion = grupo.descripcion
    this.grupo.nroItems    = grupo.nroItems
    this.grupo.vidaUtil    = grupo.vidaUtil

    this.modalService.open(content, { size: 'lg' }).result.then(
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

  // open(content:any) {
	// 	this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then(
	// 		(result) => {
	// 			this.closeResult = `Closed with: ${result}`;
	// 		},
	// 		(reason) => {
	// 			this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
	// 		},
	// 	);
	// }

	private getDismissReason(reason: any): string {
		if (reason === ModalDismissReasons.ESC) {
			return 'by pressing ESC';
		} else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
			return 'by clicking on a backdrop';
		} else {
			return `with: ${reason}`;
		}
	}



}
