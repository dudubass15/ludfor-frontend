import { Injectable } from '@angular/core';
import { StorageService } from '../storage/storage.service';
import { UsuariosService } from '../usuarios/usuarios.service';
import { StorageEnum } from '../../enums/storage.enum';
import { ResponseInterface } from '../../interfaces/response.interface';
import { UsuarioInterface } from '../../interfaces/usuario.interface';

@Injectable({
    providedIn: 'root',
})
export class LoginService {

    public constructor(
        private storage: StorageService,
        private usuarioService: UsuariosService
    ) {}

    public login(username: string, password: string): ResponseInterface<UsuarioInterface[] | []> {
        const usuarios = this.usuarioService.getAll();
        if (usuarios && usuarios.data.length > 0) {
            const response = usuarios.data.filter((usuario) => usuario.username === username && usuario.password === password);
            if (response && response.length > 0) {
                const usuario = response[0];
                this.storage.setItem(StorageEnum.USUARIO_LOGADO, JSON.stringify(usuario));
                return {
                    data: response,
                    success: true,
                }
            }
            return {
                data: [],
                success: false,
                error: 'Usuário ou senha inválidos.',
            }
        }
        return {
            data: [],
            success: false,
            error: 'Ops! Erro interno.',
        }
    }

    public logout(): ResponseInterface<boolean> {
        this.storage.removeItem(StorageEnum.USUARIO_LOGADO);
        if (!this.storage.getItem(StorageEnum.USUARIO_LOGADO)) {
            return {
                data: true,
                success: true,
            }
        }
        return {
            data: false,
            success: false,
            error: 'Erro ao realizar logout.',
        }
    }

    public isLogged(): ResponseInterface<boolean> {
        const usuarioLogado = this.storage.getItem(StorageEnum.USUARIO_LOGADO);
        if (usuarioLogado) {
            return {
                data: true,
                success: true,
            };
        }
        return {
            data: false,
            success: true
        }
    }
}
