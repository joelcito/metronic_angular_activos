import { Grupo } from "../grupo";
export class SubGrupo {
  idsubgrupo:String = '';
  descripcion:String = '';
  fecha:Date = new Date();
  fechacreacion:Date = new Date();
  fechamodificacion:Date = new Date();
  grupo:Grupo = new Grupo();
}
