import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ModalDismissReasons, NgbDatepickerModule, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { RegionalService } from '../regional/regional.service';
import { ReporteService } from './reporte.service';
import { RegimenService } from '../regimen/regimen.service';
import { GrupoService } from '../grupos/grupo.service';
import { ActivoService } from '../activo/activo.service';

import { Regional } from '../regional/regional';

import jsPDF from 'jspdf'
import autoTable, { RowInput } from 'jspdf-autotable'
import { format } from 'date-fns';

import { DatePipe } from '@angular/common';

import swal from 'sweetalert2';
import { Regimen } from '../regimen/regimen';
import { Grupo } from '../grupos/grupo';

@Component({
  selector: 'app-reporte',
  templateUrl: './reporte.component.html',
  styleUrls: ['./reporte.component.scss']
})
export class ReporteComponent implements OnInit {

  listaRegionales        : Regional[];
  regimenes              : Regimen[];
  grupos                 : Grupo[];
  listadoPersonasBuscadas: any[];
  listaActivos           : any[];
  listaActivosGeneral    : any[];
  listadoUbiGral         : any[];
  listaprovedores        : any[];

  cargandoReporteGeneral : boolean  =   false;

  formularioReportIncoporacion = new FormGroup({
    fechaInicio: new FormControl(''),
    fechaFin: new FormControl(''),
    regional: new FormControl('')
  });

  formularioReportGeneral = new FormGroup({
    fechaInicio: new FormControl(''),
    fechaFin: new FormControl(''),
    placa: new FormControl(''),
    regional: new FormControl('')
  });

  formularioReportPorRegimen = new FormGroup({
    fechaInicio: new FormControl(''),
    fechaFin: new FormControl(''),
    regimen: new FormControl(''),
    grupo: new FormControl('')
  });

  formularioReportPorGrupo = new FormGroup({
    fechaInicio: new FormControl(''),
    fechaFin: new FormControl(''),
    grupo: new FormControl('')
  });

  formularioReportAsignacion = new FormGroup({
    cedula: new FormControl(''),
    ap_paterno: new FormControl(''),
    ap_materno: new FormControl(''),
    nombre: new FormControl(''),
    fechaIni: new FormControl(''),
    fechaFin: new FormControl(''),
    numActa: new FormControl(''),
    tipoAL: new FormControl('')
  });

  formularioReportIncorporacion = new FormGroup({
    fechaIni: new FormControl(''),
    fechaFin: new FormControl(''),
    regional: new FormControl(''),
    ubiGeneral: new FormControl(''),
    numero: new FormControl(''),
    provedor: new FormControl(''),
    numeroFactura: new FormControl(''),
  });

  constructor(
    private modalService    : NgbModal,
    private regionalService : RegionalService,
    private reporteService  : ReporteService,
    private chdr            : ChangeDetectorRef,
    private datePipe        : DatePipe,
    private regimenService  : RegimenService,
    private grupoService    : GrupoService ,     
    private activoService   : ActivoService    
  ) { }

  ngOnInit(): void {
  }

  listaRegional(){
    this.regionalService.getRegionales().subscribe(res =>{
      this.listaRegionales = res
    })
  }

  listaRegimen(){
    this.regimenService.getRegimenes().subscribe(resul =>{
      this.regimenes = resul;
    })
  }

  listaGrupos(){
    this.grupoService.getGrupos().subscribe(resul =>{
      this.grupos = resul;
    })
  }

  listaUbiGeneral(){
    this.activoService.getUbiGral().subscribe(resul =>{
      this.listadoUbiGral = resul;
    })
  }

  listadoPrvedores() {
    this.activoService.listaProvedores().subscribe(result =>{
      this.listaprovedores = result
      console.log(result)
    })
  }

  abreModalReportFormularioIncorporacion(modalFormularioIncorporacion:any){
    this.listaRegional()
    this.modalService.open(modalFormularioIncorporacion, { size: 'lg' }).result.then(
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

  abreModalReportGeneral(modalReportGeneral:any){
    this.listaRegional()
    this.formularioReportGeneral.get('fechaInicio')?.setValue(this.getMinDate());
    this.formularioReportGeneral.get('fechaFin')?.setValue(this.getCurrentDate());
    this.modalService.open(modalReportGeneral, { size: 'lg' }).result.then(
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

  abreModalReportPorRegimen(modalReportePorRegimen:any){
    this.listaRegimen()
    this.listaGrupos()
    this.formularioReportPorRegimen.get('fechaInicio')?.setValue(this.getMinDate());
    this.formularioReportPorRegimen.get('fechaFin')?.setValue(this.getCurrentDate());
    this.modalService.open(modalReportePorRegimen, { size: 'lg' }).result.then(
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

  abreModalReportAsignacion(modalReporteAsigancion:any){
    this.listaRegimen()
    this.formularioReportPorRegimen.get('fechaInicio')?.setValue(this.getMinDate());
    this.formularioReportPorRegimen.get('fechaFin')?.setValue(this.getCurrentDate());
    this.modalService.open(modalReporteAsigancion, { size: 'lg' }).result.then(
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

  abreModalReportPorGrupo(modalReportePorGrupo:any){
    this.listaGrupos();
    this.formularioReportPorGrupo.get('fechaInicio')?.setValue(this.getMinDate());
    this.formularioReportPorGrupo.get('fechaFin')?.setValue(this.getCurrentDate());
    this.modalService.open(modalReportePorGrupo, { size: 'lg' }).result.then(
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

  abreModalReportIncorporacion(modalIncorporacion:any){
    this.listaRegional();
    this.listaUbiGeneral();
    this.listadoPrvedores()
    this.formularioReportPorGrupo.get('fechaInicio')?.setValue(this.getMinDate());
    this.formularioReportPorGrupo.get('fechaFin')?.setValue(this.getCurrentDate());
    this.modalService.open(modalIncorporacion, { size: 'lg' }).result.then(
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


  bucarReportIncoporacion(){
    this.reporteService.reportIncoporacion(this.formularioReportIncoporacion.value).subscribe(resul => {
      this.listaActivos = resul;
      console.log(resul)
    })
  }

  getMinDate(){
    const minDate = new Date(2022, 11, 31); // 1 de enero de 2022
    return minDate.toISOString().split('T')[0];
  }

  getCurrentDate(): string {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  // bucarReportGeneral(){
  //   if(this.isDateValid(String(this.formularioReportGeneral.value.fechaFin))){
  //     this.cargandoReporteGeneral = true;
  //     this.reporteService.reporteGeneral(this.formularioReportGeneral.value).subscribe(resul => {
  //           this.listaActivosGeneral = resul;
  //           const doc = new jsPDF({
  //             orientation: "landscape",
  //             unit:"px",
  //             format:"letter"
  //           })
  //         // It can parse html:
  //         // <table id="my-table"><!-- ... --></table>
  //         // doc.addImage("assets/media/logos/logoC.png", "JPG", 120,540,220,35)
  //         autoTable(doc,{
  //           head: [[
  //             {content:"MINISTERIO DE DEFENSA NACIONAL \n Corporacion de Seguro Social Militar \n La Paz Boivia",
  //               styles: { 
  //                 halign: 'center' ,
  //                 fontStyle: 'bold',
  //                 fontSize: 6,
  //                 valign: 'middle', //alineacion largo
  //                 // halign: 'left', //alineacion ancho
  //                 fillColor: [255, 255, 255], //color fonde de celda
  //                 textColor: [0, 0, 0], //texto color
  //                 cellWidth: 120, // Ancho del primer encabezado
  //               } 
  //             }, 
  //             {content:"RESUMEN INVENTARIADO GENERAL DE ACTUALIZACION Y DEPRECIACION DE ACTIVOS FIJO", 
  //               styles: { 
  //                 halign: 'center' ,
  //                 fontStyle: 'bold',
  //                 fontSize: 8,
  //                 valign: 'middle', //alineacion largo
  //                 // halign: 'center', //alineacion ancho
  //                 fillColor: [255, 255, 255], //color fonde de celda
  //                 textColor: [0, 0, 0], //texto color
  //                 cellWidth: 300, // Ancho del primer encabezado
  //               } 
  //             },
  //             {content:"Fecha de Emision: "+format(new Date(), 'dd/MM/yyyy'), 
  //               styles: { 
  //                 halign: 'right' ,
  //                 fontStyle: 'normal',
  //                 fontSize: 8,
  //                 valign: 'middle', //alineacion largo
  //                 // halign: 'right', //alineacion ancho
  //                 fillColor: [255, 255, 255], //color fonde de celda
  //                 textColor: [0, 0, 0], //texto color
  //                 cellWidth: 120, // Ancho del primer encabezado
  //               } 
  //             }
  //               ]],
  //           startY: 40,
  //           theme: 'grid',
  //           margin: {right: 50, left: 50},
  //           styles: { 
  //             font:"calibri",
  //             overflow: 'linebreak',
  //             cellPadding: 3,//espacio entre lineas
  //             lineColor: [0, 0, 0], //color de borde
  //             lineWidth: 0 //ancho de borde
  //           },
  //           alternateRowStyles: {
  //             fillColor: [255, 255, 255],
  //           }     
  //         });

  //         autoTable(doc,{
  //           head: [[
  //             {content:"GRUPO CONTABLE: "+"G",
  //               styles: { 
  //                 halign: 'center' ,
  //                 fontStyle: 'bold',
  //                 fontSize: 6,
  //                 valign: 'middle', //alineacion largo
  //                 // halign: 'left', //alineacion ancho
  //                 fillColor: [255, 255, 255], //color fonde de celda
  //                 textColor: [0, 0, 0], //texto color
  //                 // cellWidth: 120, // Ancho del primer encabezado
  //               } 
  //             }, 
  //             // {content:"DEL:"+this.formularioReportGeneral.get('fechaInicio')+"\nUFV: "+0.1235, 
  //             {content:"DEL: "+this.datePipe.transform(this.formularioReportGeneral.value.fechaInicio, 'dd/MM/yyyy')+"\nUFV: "+0.1235, 
  //               styles: { 
  //                 halign: 'center' ,
  //                 fontStyle: 'bold',
  //                 fontSize: 8,
  //                 valign: 'middle', //alineacion largo
  //                 // halign: 'center', //alineacion ancho
  //                 fillColor: [255, 255, 255], //color fonde de celda
  //                 textColor: [0, 0, 0], //texto color
  //                 // cellWidth: 300, // Ancho del primer encabezado
  //               } 
  //             },
  //             {content:"AL: "+this.datePipe.transform(this.formularioReportGeneral.value.fechaFin, 'dd/MM/yyyy')+"\nUFV: "+0.1235, 
  //               styles: { 
  //                 halign: 'center' ,
  //                 fontStyle: 'bold',
  //                 fontSize: 8,
  //                 valign: 'middle', //alineacion largo
  //                 // halign: 'center', //alineacion ancho
  //                 fillColor: [255, 255, 255], //color fonde de celda
  //                 textColor: [0, 0, 0], //texto color
  //                 cellWidth: 300, // Ancho del primer encabezado
  //               } 
  //             },
  //           ]],
  //           startY: 80,
  //           theme: 'grid',
  //           margin: {right: 50, left: 50},
  //           styles: { 
  //             font:"calibri",
  //             overflow: 'linebreak',
  //             cellPadding: 3,//espacio entre lineas
  //             lineColor: [0, 0, 0], //color de borde
  //             lineWidth: 0 //ancho de borde
  //           },
  //           alternateRowStyles: {
  //             fillColor: [255, 255, 255],
  //           }     
  //         });
  //         // Campos que deseas mostrar en la tabla
  //         const camposAMostrar = [
  //                                 'codigo',                     //Codigo'
  //                                 'descripcion',                //Nombre / Descripcion'
  //                                 'fechacompra',                //Fecha Adqui.
  //                                 // 'codigo',                  //Indice Ufv
  //                                 'precio',                     //Costo Historico
  //                                 'valorActualizado',           //Costo Actual Inicial
  //                                 'depreciacionAcumuladaIni',   //Dep. Acu Inicial
  //                                 // 'codigo',                  //VUR
  //                                 'actualizacion',              //Factor Actualizado
  //                                 'deprePeriodo',               //Act Gestion
  //                                 'valorActualizado',           //Costo Actualizado
  //                                 'Depre',                      //'% Dep Anual
  //                                 'deprePeriodo',               //Dep Gestion
  //                                 'actualzaiconDepre',          //Act. Dep. Acum
  //                                 'depreciacionAcumulada',      //Dep. Acum. Total
  //                                 'valorResidual'               //Valor Net
  //                               ];
            
  //         // Convertir la lista en un array de arrays para jspdf-autotable
  //         // const data = this.listaActivosGeneral.map(item => Object.values(item)) as RowInput[];

  //         // Obtener los valores de los campos seleccionados para cada elemento de la lista
  //         const data = this.listaActivosGeneral.map(item => camposAMostrar.map(campo => item[campo])) as RowInput[];

  //         // Encabezado de la tabla
  //         // const headers = Object.keys(this.listaActivosGeneral[0]);
  //         const headers = [
  //                           'Codigo', 
  //                           'Nombre / Descripcion', 
  //                           'Fecha Adqui.',
  //                           // 'Indice Ufv',
  //                           'Costo Historico',
  //                           'Costo Actual Inicial',
  //                           'Dep. Acu Inicial',
  //                           // 'VUR',
  //                           'Factor Actualizado',
  //                           'Act Gestion',
  //                           'Costo Actualizado',
  //                           '% Dep Anual',
  //                           'Dep Gestion',
  //                           'Act. Dep. Acum',
  //                           'Dep. Acum. Total',
  //                           'Valor Neto'
  //                         ];
  //           // head: [[
  //           //         'Codigo',
  //           //         'Gestion',
  //           //         'UFV Adq.', 
  //           //         'Valor Activo', 
  //           //         'Actualizacion', 
  //           //         'Valor Actualizado', 
  //           //         'Depre. Acum.', 
  //           //         'Depre. Actual.', 
  //           //         'Depreciacion', 
  //           //         'Depreciacion Periodo', 
  //           //         'Cant. Meses', 
  //           //         'Total Depre.', 
  //           //         'Valor Residual', 
  //           //       ]],

  //           // Generar la tabla con jspdf-autotable
  //         autoTable(doc ,{ 
  //                     head: [headers],
  //                     body: data ,
  //                     styles: {
  //                       fontSize: 7,
  //                       cellPadding: 2,
  //                       textColor: [0, 0, 0],
  //                       lineColor: [0, 0, 0],
  //                       lineWidth: 0.1,
  //                       fontStyle: 'normal', // Cambio "normal" a 'normal'
  //                       valign: 'middle',
  //                       halign: 'center',
  //                       fillColor:[ 255, 255, 255],
  //                     },
  //                     headStyles: {
  //                       halign: 'center' ,
  //                       fontStyle: 'bold',
  //                       fontSize: 6,
  //                       valign: 'middle', //alineacion largo
  //                       // halign: 'left', //alineacion ancho
  //                       fillColor: [255, 255, 255], //color fonde de celda
  //                       textColor: [0, 0, 0], //texto color
  //                     },
  //                   });

  //         // Crear la configuración de la tabla
  //         // const tableConfig :UserOptions= {
  //         //   head: [[
  //         //           'Codigo',
  //         //           'Gestion',
  //         //           'UFV Adq.', 
  //         //           'Valor Activo', 
  //         //           'Actualizacion', 
  //         //           'Valor Actualizado', 
  //         //           'Depre. Acum.', 
  //         //           'Depre. Actual.', 
  //         //           'Depreciacion', 
  //         //           'Depreciacion Periodo', 
  //         //           'Cant. Meses', 
  //         //           'Total Depre.', 
  //         //           'Valor Residual', 
  //         //         ]],
  //         //   body: Object.values(this.listadoDepreciaciones).map(item => [
  //         //     this.activo.codigo,
  //         //     item.gestion ,
  //         //     item.ufv_Adq,
  //         //     item.valor_activo.toFixed(2),
  //         //     item.actualizacion.toFixed(2),
  //         //     item.valor_actualizado.toFixed(2),
  //         //     item.depre_acumulado.toFixed(2),
  //         //     item.depre_actualizacion.toFixed(2),
  //         //     item.depreciacion.toFixed(2),
  //         //     item.depreciacion_periodo.toFixed(2),
  //         //     item.cant_meses,
  //         //     item.total_depre.toFixed(2),
  //         //     (item.valor_residual === 0)? '1.00' : item.valor_residual.toFixed(2),
  //         //   ]),
  //         //   styles: {
  //         //     fontSize: 8,
  //         //     cellPadding: 2,
  //         //     textColor: [0, 0, 0],
  //         //     lineColor: [0, 0, 0],
  //         //     lineWidth: 0.1,
  //         //     fontStyle: 'normal', // Cambio "normal" a 'normal'
  //         //     valign: 'middle',
  //         //     halign: 'center',
  //         //     fillColor:[ 255, 255, 255],
  //         //   },
  //         //   headStyles: {
  //         //     halign: 'center' ,
  //         //     fontStyle: 'bold',
  //         //     fontSize: 6,
  //         //     valign: 'middle', //alineacion largo
  //         //     // halign: 'left', //alineacion ancho
  //         //     fillColor: [255, 255, 255], //color fonde de celda
  //         //     textColor: [0, 0, 0], //texto color
  //         //   },
  //         // };

  //         // doc.auto

  //         // autoTable(doc,tableConfig);

  //         autoTable(doc,{
  //           head: [[
  //             {content:"ENCARGADO DE ACTIVOS FIJOS",
  //               styles: { 
  //                 halign: 'center' ,
  //                 fontStyle: 'bold',
  //                 fontSize: 6,
  //                 valign: 'middle', //alineacion largo
  //                 // halign: 'left', //alineacion ancho
  //                 fillColor: [255, 255, 255], //color fonde de celda
  //                 textColor: [0, 0, 0], //texto color
  //                 // cellWidth: 120, // Ancho del primer encabezado
  //               } 
  //             }, 
  //             {content:"JEFE DE UNIDAD", 
  //               styles: { 
  //                 halign: 'center' ,
  //                 fontStyle: 'bold',
  //                 fontSize: 8,
  //                 valign: 'middle', //alineacion largo
  //                 // halign: 'center', //alineacion ancho
  //                 fillColor: [255, 255, 255], //color fonde de celda
  //                 textColor: [0, 0, 0], //texto color
  //                 // cellWidth: 300, // Ancho del primer encabezado
  //               } 
  //             },
  //             {content:"O MAXIMO EJECUTIVO UNIDAD", 
  //               styles: { 
  //                 halign: 'center' ,
  //                 fontStyle: 'bold',
  //                 fontSize: 8,
  //                 valign: 'middle', //alineacion largo
  //                 // halign: 'center', //alineacion ancho
  //                 fillColor: [255, 255, 255], //color fonde de celda
  //                 textColor: [0, 0, 0], //texto color
  //                 cellWidth: 300, // Ancho del primer encabezado
  //               } 
  //             },
  //           ]],
  //           startY: 250,
  //           theme: 'grid',
  //           margin: {right: 50, left: 50},
  //           styles: { 
  //             font:"calibri",
  //             overflow: 'linebreak',
  //             cellPadding: 3,//espacio entre lineas
  //             lineColor: [0, 0, 0], //color de borde
  //             lineWidth: 0 //ancho de borde
  //           },
  //           alternateRowStyles: {
  //             fillColor: [255, 255, 255],
  //           }     
  //         });

  //         this.cargandoReporteGeneral = false;

  //         if(true){
  //           window.open(doc.output('bloburl'), 'solicutud', 'width=1000, height=900, top=100')
  //         }else{
  //           doc.save('table.pdf')
  //         }


  //           console.log(resul)
  //     })
  //   }else{
  //     swal.fire({
  //       icon: 'error',
  //       title: 'Error!',
  //       text: 'Introduzca una fecha valida',
  //       // timer: 2000
  //     })
  //   }
  // }

  reporteGeneralNew(){
    // if(this.isDateValid(String(this.formularioReportGeneral.value.fechaFin))){
      this.cargandoReporteGeneral = true;
      
      this.reporteService.reporteGeneralNew(this.formularioReportGeneral.value).subscribe((response: Blob) => {
        const file = new Blob([response], { type: 'application/pdf' });
        const fileURL = URL.createObjectURL(file);
        window.open(fileURL, '_blank');
        this.cargandoReporteGeneral = false;
      })

    // }else{
    //   swal.fire({
    //     icon: 'error',
    //     title: 'Error!',
    //     text: 'Introduzca una fecha valida',
    //     // timer: 2000
    //   })
    // }
  }

  reportePorRegimen(){
    // if(this.isDateValid(String(this.formularioReportPorRegimen.value.fechaFin))){

      this.cargandoReporteGeneral = true;
      this.reporteService.reportePorRegimen(this.formularioReportPorRegimen.value).subscribe((response: Blob) => {
        const file = new Blob([response], { type: 'application/pdf' });
        const fileURL = URL.createObjectURL(file);
        window.open(fileURL, '_blank');
        this.cargandoReporteGeneral = false;
      })

    // }else{
    //   swal.fire({
    //     icon: 'error',
    //     title: 'Error!',
    //     text: 'Introduzca una fecha valida',
    //     // timer: 2000
    //   })
    // }
  }

  reportePorGrupo(){
    if(this.isDateValid(String(this.formularioReportPorGrupo.value.fechaFin))){
      this.cargandoReporteGeneral = true;
      this.reporteService.reportePorGrupo(this.formularioReportPorGrupo.value).subscribe((response: Blob) => {
        const file = new Blob([response], { type: 'application/pdf' });
        const fileURL = URL.createObjectURL(file);
        window.open(fileURL, '_blank');
        this.cargandoReporteGeneral = false;
      })

    }else{
      swal.fire({
        icon: 'error',
        title: 'Error!',
        text: 'Introduzca una fecha valida',
      })
    }
  }

  reporteAsignacion(){
    this.cargandoReporteGeneral = true;
    this.reporteService.reporteAsignacion(this.formularioReportPorGrupo.value).subscribe((response: Blob) => {
      const file = new Blob([response], { type: 'application/pdf' });
      const fileURL = URL.createObjectURL(file);
      window.open(fileURL, '_blank');
      this.cargandoReporteGeneral = false;
    })
  }

  reporteIncorporacion(){
    // console.log(this.formularioReportIncorporacion.value)
    this.cargandoReporteGeneral = true;
    this.reporteService.reporteIncorporacion(this.formularioReportIncorporacion.value).subscribe((response: Blob) => {
      const file = new Blob([response], { type: 'application/pdf' });
      const fileURL = URL.createObjectURL(file);
      window.open(fileURL, '_blank');
      this.cargandoReporteGeneral = false;
    })
  }

  buscarPersona(){
    this.formularioReportAsignacion.get('ap_paterno')?.setValue(String(this.formularioReportAsignacion.value.ap_paterno?.toUpperCase()))
    this.formularioReportAsignacion.get('ap_materno')?.setValue(String(this.formularioReportAsignacion.value.ap_materno?.toUpperCase()))
    this.formularioReportAsignacion.get('nombre')?.setValue(String(this.formularioReportAsignacion.value.nombre?.toUpperCase()))
    this.reporteService.buscarPersona(this.formularioReportAsignacion.value).subscribe(resul =>{
      // console.log(resul)
      this.listadoPersonasBuscadas = resul;
    })
  }

  seleccionar(nombre:string, ci:string){
    // console.log(
    //   this.formularioReportAsignacion.value,
    //   this.formularioReportAsignacion.value.fechaIni,
    //   this.formularioReportAsignacion.value.fechaFin,
    //   this.formularioReportAsignacion.value.tipoAL
    //   )
    
    const persona = {
      cedula  : ci,
      nombre  : nombre,
      fechaIni: this.formularioReportAsignacion.value.fechaIni,
      fechaFin: this.formularioReportAsignacion.value.fechaFin,
      tipo    : this.formularioReportAsignacion.value.tipoAL,
      numActa : this.formularioReportAsignacion.value.numActa,
    };

    this.reporteService.reporteAsignacion(JSON.stringify(persona)).subscribe((response: Blob) => {
      const file = new Blob([response], { type: 'application/pdf' });
      const fileURL = URL.createObjectURL(file);
      window.open(fileURL, '_blank');
      // this.cargandoReporteGeneral = false;
    })
  }  

  isDateValid(dateString: string): boolean {
    const date = new Date(dateString);
    return date instanceof Date && !isNaN(date.getTime());
  }

  onPlacaInputChange(event: any) {
    const inputValue: string = event.target.value;
    const uppercaseValue: string = inputValue.toUpperCase();
    this.formularioReportGeneral.get('placa')?.setValue(uppercaseValue);
  }

  
}
