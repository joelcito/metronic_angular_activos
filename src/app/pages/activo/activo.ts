import { Grupo } from "../grupos/grupo";
import { SubGrupo } from "../grupos/sub-grupo/sub-grupo";
import { Incorporacion } from "../incorporacion/incorporacion";
import { Regimen } from "../regimen/regimen";
import { Regional } from "../regional/regional";
import { UnidadManejo } from "../unidad-manejo/unidad-manejo";
export class Activo {

    idactivo:String = '';
    descripcion:string = '';
    incorporacion:Incorporacion = new Incorporacion();
    grupo:Grupo = new Grupo();
    subgrupo:SubGrupo = new SubGrupo();
    codigo:string = '';
    regimen:Regimen = new Regimen();
    regional:Regional = new Regional();
    unidadmanejo:UnidadManejo = new UnidadManejo();
    eficiencia:string = '';
    formainicial:String = '';
    estadoregistro:String = '';

    fechacompra:string = '';
    // fechacompra:Date = new Date();

    ufv:String ='';
    ufvcompra:String ='';
    porcentaje_depreciacion:string = '';
    vida_util:string  = '';
    placa:string = '';


    // grupo:string = '';
    codigo_item:string = '';
    departameto:string = '';
    ufv_inicio:string  = '';
    estado:string = '';

    rubro:String ='';
    tipo_cuenta:String ='';
    tipo_incorporacion:String ='';
    tipo_regimen:String ='';
    tipo_modelo:String ='';
    tipo_marca:String ='';
    tipo_activo:String ='';
    numero_serie:String ='';
    ubicacion_general:String ='';
    ubicacion_especifica:String ='';
    fecha:String ='';
  }
