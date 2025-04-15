import { BaseInterface } from "./base.interface";

export interface FuncionarioInterface extends BaseInterface {
    nome: string;
    email: string;
    celular: number;
    ativo: boolean;
    ramal: number;
    bairro: string;
    complemento: string;
    logradouro: string;
    numero: number;
    cidade: string;
    estado: string;
}
