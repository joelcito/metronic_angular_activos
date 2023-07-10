import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ModalDismissReasons, NgbDatepickerModule, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { RegionalService } from '../regional/regional.service';
import { ReporteService } from './reporte.service';

import { Regional } from '../regional/regional';

import jsPDF from 'jspdf'
import autoTable, { RowInput } from 'jspdf-autotable'
import { format } from 'date-fns';

import { DatePipe } from '@angular/common';

import swal from 'sweetalert2';

@Component({
  selector: 'app-reporte',
  templateUrl: './reporte.component.html',
  styleUrls: ['./reporte.component.scss']
})
export class ReporteComponent implements OnInit {

  listaActivos          :any[];
  listaActivosGeneral   :any[];
  listaRegionales        :Regional[];

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

  constructor(
    private modalService    : NgbModal,
    private regionalService :RegionalService,
    private reporteService  :ReporteService,
    private chdr            :ChangeDetectorRef,
    private datePipe        : DatePipe
  ) { }

  ngOnInit(): void {
  }

  listaRegional(){
    this.regionalService.getRegionales().subscribe(res =>{
      this.listaRegionales = res
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

  

  bucarReportGeneral(){
    if(this.isDateValid(String(this.formularioReportGeneral.value.fechaFin))){
      this.cargandoReporteGeneral = true;
      this.reporteService.reporteGeneral(this.formularioReportGeneral.value).subscribe(resul => {
            this.listaActivosGeneral = resul;
            const doc = new jsPDF({
              orientation: "landscape",
              unit:"px",
              format:"letter"
            })
          // It can parse html:
          // <table id="my-table"><!-- ... --></table>
          // doc.addImage("assets/media/logos/logoC.png", "JPG", 120,540,220,35)
          autoTable(doc,{
            head: [[
              {content:"MINISTERIO DE DEFENSA NACIONAL \n Corporacion de Seguro Social Militar \n La Paz Boivia",
                styles: { 
                  halign: 'center' ,
                  fontStyle: 'bold',
                  fontSize: 6,
                  valign: 'middle', //alineacion largo
                  // halign: 'left', //alineacion ancho
                  fillColor: [255, 255, 255], //color fonde de celda
                  textColor: [0, 0, 0], //texto color
                  cellWidth: 120, // Ancho del primer encabezado
                } 
              }, 
              {content:"RESUMEN INVENTARIADO GENERAL DE ACTUALIZACION Y DEPRECIACION DE ACTIVOS FIJO", 
                styles: { 
                  halign: 'center' ,
                  fontStyle: 'bold',
                  fontSize: 8,
                  valign: 'middle', //alineacion largo
                  // halign: 'center', //alineacion ancho
                  fillColor: [255, 255, 255], //color fonde de celda
                  textColor: [0, 0, 0], //texto color
                  cellWidth: 300, // Ancho del primer encabezado
                } 
              },
              {content:"Fecha de Emision: "+format(new Date(), 'dd/MM/yyyy'), 
                styles: { 
                  halign: 'right' ,
                  fontStyle: 'normal',
                  fontSize: 8,
                  valign: 'middle', //alineacion largo
                  // halign: 'right', //alineacion ancho
                  fillColor: [255, 255, 255], //color fonde de celda
                  textColor: [0, 0, 0], //texto color
                  cellWidth: 120, // Ancho del primer encabezado
                } 
              }
                ]],
            startY: 40,
            theme: 'grid',
            margin: {right: 50, left: 50},
            styles: { 
              font:"calibri",
              overflow: 'linebreak',
              cellPadding: 3,//espacio entre lineas
              lineColor: [0, 0, 0], //color de borde
              lineWidth: 0 //ancho de borde
            },
            alternateRowStyles: {
              fillColor: [255, 255, 255],
            }     
          });

          autoTable(doc,{
            head: [[
              {content:"GRUPO CONTABLE: "+"G",
                styles: { 
                  halign: 'center' ,
                  fontStyle: 'bold',
                  fontSize: 6,
                  valign: 'middle', //alineacion largo
                  // halign: 'left', //alineacion ancho
                  fillColor: [255, 255, 255], //color fonde de celda
                  textColor: [0, 0, 0], //texto color
                  // cellWidth: 120, // Ancho del primer encabezado
                } 
              }, 
              // {content:"DEL:"+this.formularioReportGeneral.get('fechaInicio')+"\nUFV: "+0.1235, 
              {content:"DEL: "+this.datePipe.transform(this.formularioReportGeneral.value.fechaInicio, 'dd/MM/yyyy')+"\nUFV: "+0.1235, 
                styles: { 
                  halign: 'center' ,
                  fontStyle: 'bold',
                  fontSize: 8,
                  valign: 'middle', //alineacion largo
                  // halign: 'center', //alineacion ancho
                  fillColor: [255, 255, 255], //color fonde de celda
                  textColor: [0, 0, 0], //texto color
                  // cellWidth: 300, // Ancho del primer encabezado
                } 
              },
              {content:"AL: "+this.datePipe.transform(this.formularioReportGeneral.value.fechaFin, 'dd/MM/yyyy')+"\nUFV: "+0.1235, 
                styles: { 
                  halign: 'center' ,
                  fontStyle: 'bold',
                  fontSize: 8,
                  valign: 'middle', //alineacion largo
                  // halign: 'center', //alineacion ancho
                  fillColor: [255, 255, 255], //color fonde de celda
                  textColor: [0, 0, 0], //texto color
                  cellWidth: 300, // Ancho del primer encabezado
                } 
              },
            ]],
            startY: 80,
            theme: 'grid',
            margin: {right: 50, left: 50},
            styles: { 
              font:"calibri",
              overflow: 'linebreak',
              cellPadding: 3,//espacio entre lineas
              lineColor: [0, 0, 0], //color de borde
              lineWidth: 0 //ancho de borde
            },
            alternateRowStyles: {
              fillColor: [255, 255, 255],
            }     
          });
          // Campos que deseas mostrar en la tabla
          const camposAMostrar = [
                                  'codigo',
                                  'descripcion', 
                                  'fechacompra', 
                                  // 'codigo', 
                                  'precio', 
                                  'valorActualizado', 
                                  'depreciacionAcumuladaIni', 
                                  // 'codigo', 
                                  'actualizacion', 
                                  'deprePeriodo', 
                                  'valorActualizado', 
                                  'Depre', 
                                  'deprePeriodo', 
                                  'actualzaiconDepre', 
                                  'depreciacionAcumulada', 
                                  'valorResidual'
                                ];
            
          // Convertir la lista en un array de arrays para jspdf-autotable
          // const data = this.listaActivosGeneral.map(item => Object.values(item)) as RowInput[];

          // Obtener los valores de los campos seleccionados para cada elemento de la lista
          const data = this.listaActivosGeneral.map(item => camposAMostrar.map(campo => item[campo])) as RowInput[];

          // Encabezado de la tabla
          // const headers = Object.keys(this.listaActivosGeneral[0]);
          const headers = [
                            'Codigo', 
                            'Nombre / Descripcion', 
                            'Fecha Adqui.',
                            // 'Indice Ufv',
                            'Costo Historico',
                            'Costo Actual Inicial',
                            'Dep. Acu Inicial',
                            // 'VUR',
                            'Factor Actualizado',
                            'Act Gestion',
                            'Costo Actualizado',
                            '% Dep Anual',
                            'Dep Gestion',
                            'Act. Dep. Acum',
                            'Dep. Acum. Total',
                            'Valor Neto'
                          ];
            // head: [[
            //         'Codigo',
            //         'Gestion',
            //         'UFV Adq.', 
            //         'Valor Activo', 
            //         'Actualizacion', 
            //         'Valor Actualizado', 
            //         'Depre. Acum.', 
            //         'Depre. Actual.', 
            //         'Depreciacion', 
            //         'Depreciacion Periodo', 
            //         'Cant. Meses', 
            //         'Total Depre.', 
            //         'Valor Residual', 
            //       ]],

            // Generar la tabla con jspdf-autotable
          autoTable(doc ,{ 
                      head: [headers],
                      body: data ,
                      styles: {
                        fontSize: 7,
                        cellPadding: 2,
                        textColor: [0, 0, 0],
                        lineColor: [0, 0, 0],
                        lineWidth: 0.1,
                        fontStyle: 'normal', // Cambio "normal" a 'normal'
                        valign: 'middle',
                        halign: 'center',
                        fillColor:[ 255, 255, 255],
                      },
                      headStyles: {
                        halign: 'center' ,
                        fontStyle: 'bold',
                        fontSize: 6,
                        valign: 'middle', //alineacion largo
                        // halign: 'left', //alineacion ancho
                        fillColor: [255, 255, 255], //color fonde de celda
                        textColor: [0, 0, 0], //texto color
                      },
                    });

          // Crear la configuración de la tabla
          // const tableConfig :UserOptions= {
          //   head: [[
          //           'Codigo',
          //           'Gestion',
          //           'UFV Adq.', 
          //           'Valor Activo', 
          //           'Actualizacion', 
          //           'Valor Actualizado', 
          //           'Depre. Acum.', 
          //           'Depre. Actual.', 
          //           'Depreciacion', 
          //           'Depreciacion Periodo', 
          //           'Cant. Meses', 
          //           'Total Depre.', 
          //           'Valor Residual', 
          //         ]],
          //   body: Object.values(this.listadoDepreciaciones).map(item => [
          //     this.activo.codigo,
          //     item.gestion ,
          //     item.ufv_Adq,
          //     item.valor_activo.toFixed(2),
          //     item.actualizacion.toFixed(2),
          //     item.valor_actualizado.toFixed(2),
          //     item.depre_acumulado.toFixed(2),
          //     item.depre_actualizacion.toFixed(2),
          //     item.depreciacion.toFixed(2),
          //     item.depreciacion_periodo.toFixed(2),
          //     item.cant_meses,
          //     item.total_depre.toFixed(2),
          //     (item.valor_residual === 0)? '1.00' : item.valor_residual.toFixed(2),
          //   ]),
          //   styles: {
          //     fontSize: 8,
          //     cellPadding: 2,
          //     textColor: [0, 0, 0],
          //     lineColor: [0, 0, 0],
          //     lineWidth: 0.1,
          //     fontStyle: 'normal', // Cambio "normal" a 'normal'
          //     valign: 'middle',
          //     halign: 'center',
          //     fillColor:[ 255, 255, 255],
          //   },
          //   headStyles: {
          //     halign: 'center' ,
          //     fontStyle: 'bold',
          //     fontSize: 6,
          //     valign: 'middle', //alineacion largo
          //     // halign: 'left', //alineacion ancho
          //     fillColor: [255, 255, 255], //color fonde de celda
          //     textColor: [0, 0, 0], //texto color
          //   },
          // };

          // doc.auto

          // autoTable(doc,tableConfig);

          autoTable(doc,{
            head: [[
              {content:"ENCARGADO DE ACTIVOS FIJOS",
                styles: { 
                  halign: 'center' ,
                  fontStyle: 'bold',
                  fontSize: 6,
                  valign: 'middle', //alineacion largo
                  // halign: 'left', //alineacion ancho
                  fillColor: [255, 255, 255], //color fonde de celda
                  textColor: [0, 0, 0], //texto color
                  // cellWidth: 120, // Ancho del primer encabezado
                } 
              }, 
              {content:"JEFE DE UNIDAD", 
                styles: { 
                  halign: 'center' ,
                  fontStyle: 'bold',
                  fontSize: 8,
                  valign: 'middle', //alineacion largo
                  // halign: 'center', //alineacion ancho
                  fillColor: [255, 255, 255], //color fonde de celda
                  textColor: [0, 0, 0], //texto color
                  // cellWidth: 300, // Ancho del primer encabezado
                } 
              },
              {content:"O MAXIMO EJECUTIVO UNIDAD", 
                styles: { 
                  halign: 'center' ,
                  fontStyle: 'bold',
                  fontSize: 8,
                  valign: 'middle', //alineacion largo
                  // halign: 'center', //alineacion ancho
                  fillColor: [255, 255, 255], //color fonde de celda
                  textColor: [0, 0, 0], //texto color
                  cellWidth: 300, // Ancho del primer encabezado
                } 
              },
            ]],
            startY: 250,
            theme: 'grid',
            margin: {right: 50, left: 50},
            styles: { 
              font:"calibri",
              overflow: 'linebreak',
              cellPadding: 3,//espacio entre lineas
              lineColor: [0, 0, 0], //color de borde
              lineWidth: 0 //ancho de borde
            },
            alternateRowStyles: {
              fillColor: [255, 255, 255],
            }     
          });

          this.cargandoReporteGeneral = false;

          if(true){
            window.open(doc.output('bloburl'), 'solicutud', 'width=1000, height=900, top=100')
          }else{
            doc.save('table.pdf')
          }


            console.log(resul)
      })
    }else{
      swal.fire({
        icon: 'error',
        title: 'Error!',
        text: 'Introduzca una fecha valida',
        // timer: 2000
      })
    }
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
