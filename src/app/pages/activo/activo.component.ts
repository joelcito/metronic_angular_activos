import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
// import { LayoutService } from '../../_metronic/layout';

// PARA LOS SERVICIOS
// import { ActivoModule } from './activo.module';
import { ActivoService } from './activo.service';
import { Activo } from './activo';

// import { ActivoModule } from './activo.module';
// import { finalize, map } from 'rxjs/operators';
// import { async } from '@angular/core/testing';
// import { Observable } from 'rxjs';

// import { MdbModalRef } from 'mdb-angular-ui-kit/modal'

import { ModalDismissReasons, NgbDatepickerModule, NgbModal } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-activo',
  // standalone: true,
  // imports: [NgbDatepickerModule],
  templateUrl: './activo.component.html',
})

// export class ActivoComponent{
export class ActivoComponent implements OnInit {
  model: any;
  @ViewChild('form', { static: true }) form: NgForm;
  configLoading: boolean = false;
  resetLoading: boolean = false;
  tabla: boolean = false;

  activos1: any = [];

  closeResult = '';

  constructor(
    private activoService: ActivoService,
    private modalService: NgbModal
  ){
  }

  ngOnInit(){
    this.activos1 = this.activoService.getActivos();
  }

  openModal(){
    console.log("haber este")
  }

  open(content:any) {
		this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then(
			(result) => {
				this.closeResult = `Closed with: ${result}`;
			},
			(reason) => {
				this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
			},
		);
	}

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
