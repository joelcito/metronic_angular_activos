import { Activo } from "../activo/activo";
import { Componente } from "../grupos/sub-grupo/componente/componente";

export class Caracteristica {
  idcaracteristica: string;
  descripcion:String = "";
  fecha:Date = new Date();
  fechacreacion:Date = new Date();
  fechamodificacion:Date = new Date();

  activo:Activo = new Activo();
  // activo_id:Activo = new Activo();
  componente:Componente = new Componente();
  // componente_id:Componente = new Componente();
}
