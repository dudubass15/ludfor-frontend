import { BaseInterface } from "./base.interface";

export interface UsuarioInterface extends BaseInterface {
    username: string;
    password: string;
    nome_completo: string;
    email: string;
    telefone?: number;
}
