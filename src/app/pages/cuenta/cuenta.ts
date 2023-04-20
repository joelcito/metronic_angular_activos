import { Partida } from "../partida/partida";

export class Cuenta {
  idcuenta:string         = '';
  nombre:String           = '';
  descripcion:String      = '';
  nroCuenta:String       = '';
  partida:Partida         =  new Partida();
  fecha:Date              =  new  Date();
  fechacreacion:Date      =  new  Date();
  fechamodificacion:Date  =  new  Date();
}
