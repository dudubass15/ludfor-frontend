import { Injectable } from '@angular/core';
import { StorageService } from '../storage/storage.service';
import { StorageEnum } from '../../enums/storage.enum';
import { UsuarioInterface } from '../../interfaces/usuario.interface';
import { ResponseInterface } from '../../interfaces/response.interface';

@Injectable({
    providedIn: 'root',
})
export class UsuariosService {

    public constructor(private storageService: StorageService) {}

    public getAll(): ResponseInterface<UsuarioInterface[] | []> {
        const data = this.storageService.getItem(StorageEnum.USUARIOS_STORAGE);
        if (data && data.length > 0) {
            const response = JSON.parse(data as string) as UsuarioInterface[];
            return {
                data: response,
                success: true,
            };
        }
        return {
            data: [],
            success: false,
            error: 'Nenhum usuário encontrado.',
        };
    }

    public getById(id: number): ResponseInterface<UsuarioInterface | null> {
        const usuarios = this.getAll();
        if (usuarios && usuarios.data.length > 0) {
            const response = usuarios.data.filter((usuario) => usuario.id === id);
            if (response && response.length > 0) {
                return {
                    data: response[0],
                    success: true,
                };
            }
            return {
                data: null,
                success: false,
                error: 'Usuário não encontrado.',
            };
        }
        return {
            data: null,
            success: false,
            error: 'Nenhum usuário encontrado.',
        };
    }

    public add(usuario: UsuarioInterface): ResponseInterface<UsuarioInterface | null> {
        if (this.verifyExistingUser(usuario)) {
            return {
                data: null,
                success: false,
                error: 'Usuário já cadastrado.',
            }
        }

        let items: UsuarioInterface[] = this.getAll().data;
        usuario.id = this.incrementId();
        items.push(usuario);
        const data = JSON.stringify(items);
        this.storageService.setItem(StorageEnum.USUARIOS_STORAGE, data);
        return {
            data: usuario,
            success: true,
        }
    }

    private verifyExistingUser(usuario: UsuarioInterface): boolean {
        const usuarios = this.getAll();
        if (usuarios && usuarios.data.length > 0) {
            const existingUsuario = usuarios.data.filter((u) => u.username === usuario.username)[0];
            if (existingUsuario) return true;
        }
        return false;
    }

    private incrementId(): number {
        const usuarios = this.getAll();
        if (usuarios && usuarios.data.length > 0) {
            const lastId = usuarios.data[usuarios.data.length - 1].id;
            return lastId + 1;
        } else {
            return 1;
        }
    }
}
