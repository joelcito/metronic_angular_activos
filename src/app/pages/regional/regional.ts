import { Departamento } from "../departamento/departamento";

export class Regional {
  idiregional:String = '';
  dapartamento:Departamento = new Departamento();
  nombre:String = '';
  descripcion:String = '';
  estado:String = '';
  fecha:Date = new Date();
  fechacreacion:Date = new Date();
  fechamodificacion:Date = new Date();
}
