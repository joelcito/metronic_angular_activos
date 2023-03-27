import { SubGrupo } from "../grupos/sub-grupo/sub-grupo";
export class Componente {
  idcomponent: string;
  subgrupo:SubGrupo = new SubGrupo();
  nombre:String = "";
  estado:String = "";
  fecha:Date = new Date();
  fechacreacion:Date = new Date();
  fechamodificacion:Date = new Date();
}
