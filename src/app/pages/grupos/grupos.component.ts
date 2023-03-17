import { Component, Input, OnInit } from '@angular/core';
import { Grupo } from './grupo';
import { GrupoService } from './grupo.service';

import { ModalDismissReasons, NgbDatepickerModule, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-grupos',
  templateUrl: './grupos.component.html',
})
export class GrupoComponent implements OnInit {

  grupos:any = [];
  closeResult = '';
  @Input() grupo:Grupo = new Grupo();

  grupoForm = new FormGroup({
    descripcion: new FormControl(''),
    nro_items: new FormControl(''),
    vida_util: new FormControl(''),
  });

  constructor(
    private grupoService: GrupoService,
    private modalService: NgbModal
  ) { }

  ngOnInit(): void {

    this.grupos = this.grupoService.getGrupos();

    // this.grupoService.getGrupos().subscribe((grupos) => {
    //   this.grupos = grupos
    //   console.log(grupos)
    // })
  }

  openLg(content:any) {
		// this.modalService.open(content, { size: 'lg' });

    this.modalService.open(content, { size: 'lg' }).result.then(
      (result) => {
        if(result==='guardar'){

          console.log(this.grupo)

          console.log("se guardara");
        }else{
          console.log("no guardara");
        }
        // console.log(result)
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

  create(){
    console.log(this.grupoForm.value)
    // console.log(this.grupo)
  }

}
