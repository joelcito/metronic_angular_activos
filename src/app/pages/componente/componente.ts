import { SubGrupo } from "../grupos/sub-grupo/sub-grupo";
export class Componente {
  idcomponente: string;
  subgrupo:SubGrupo = new SubGrupo();
  nombre:String = "";
  estado:String = "";
  fecha:Date = new Date();
  fechacreacion:Date = new Date();
  fechamodificacion:Date = new Date();
}
