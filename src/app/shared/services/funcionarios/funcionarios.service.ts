import { Injectable } from '@angular/core';
import { FuncionarioInterface } from '../../interfaces/funcionario.interface';
import { StorageService } from '../storage/storage.service';
import { ResponseInterface } from '../../interfaces/response.interface';
import { StorageEnum } from '../../enums/storage.enum';

@Injectable({
    providedIn: 'root',
})
export class FuncionariosService {

    public constructor(private storageService: StorageService) {}

    public getAll(): ResponseInterface<FuncionarioInterface[]> {
        const data = this.storageService.getItem(
            StorageEnum.FUNCIONARIOS_STORAGE
        );
        if (data && data.length > 0) {
            const response = JSON.parse(
                data as string
            ) as FuncionarioInterface[];
            return {
                data: response,
                success: true,
            };
        }
        return {
            data: [],
            success: false,
            error: 'Nenhum funcionário encontrado.',
        };
    }

    public getById(id: number): ResponseInterface<FuncionarioInterface | null> {
        const funcionarios = this.getAll();
        if (funcionarios && funcionarios.data.length > 0) {
            const response = funcionarios.data.filter(
                (funcionario) => funcionario.id === id
            );
            if (response && response.length > 0) {
                return {
                    data: response[0],
                    success: true,
                };
            }
            return {
                data: null,
                success: false,
                error: 'Funcionário não encontrado.',
            };
        }
        return {
            data: null,
            success: false,
            error: 'Nenhum funcionário encontrado.',
        };
    }

    public add(
        funcionario: FuncionarioInterface
    ): ResponseInterface<FuncionarioInterface | null> {
        if (this.verifyExistingEmployeer(funcionario)) {
            return {
                data: null,
                success: false,
                error: 'Funcionário já cadastrado.',
            };
        }

        let items: FuncionarioInterface[] = this.getAll().data;
        funcionario.id = this.incrementId();
        items.push(funcionario);
        const data = JSON.stringify(items);
        this.storageService.setItem(StorageEnum.FUNCIONARIOS_STORAGE, data);
        return {
            data: funcionario,
            success: true,
        };
    }

    public edit(id: number, funcionario: FuncionarioInterface): ResponseInterface<FuncionarioInterface | null> {
        const funcionarios = this.getAll();
        if (funcionarios && funcionarios.data.length > 0) {
            const index = funcionarios.data.findIndex(
                (u) => u.id === id
            );
            if (index !== -1) {
                funcionario.id = id;
                funcionarios.data[index] = funcionario;
                const data = JSON.stringify(funcionarios.data);
                this.storageService.setItem(StorageEnum.FUNCIONARIOS_STORAGE, data);
                return {
                    data: funcionario,
                    success: true,
                };
            }
            return {
                data: null,
                success: false,
                error: 'Funcionário não encontrado.',
            };
        }
        return {
            data: null,
            success: false,
            error: 'Nenhum funcionário encontrado.',
        };
    }

    public delete(id: number): ResponseInterface<FuncionarioInterface | null> {
        const funcionarios = this.getAll();
        if (funcionarios && funcionarios.data.length > 0) {
            const index = funcionarios.data.findIndex(
                (u) => u.id === id
            );
            if (index !== -1) {
                funcionarios.data.splice(index, 1);
                const data = JSON.stringify(funcionarios.data);
                this.storageService.setItem(StorageEnum.FUNCIONARIOS_STORAGE, data);
                return {
                    data: null,
                    success: true,
                };
            }
            return {
                data: null,
                success: false,
                error: 'Funcionário não encontrado.',
            };
        }
        return {
            data: null,
            success: false,
            error: 'Nenhum funcionário encontrado.',
        };
    }

    private verifyExistingEmployeer(
        funcionario: FuncionarioInterface
    ): boolean {
        const funcionarios = this.getAll();
        if (funcionarios && funcionarios.data.length > 0) {
            const result = funcionarios.data.filter(
                (u) => u.nome === funcionario.nome
            )[0];
            if (result) return true;
        }
        return false;
    }

    private incrementId(): number {
        const funcionarios = this.getAll();
        if (funcionarios && funcionarios.data.length > 0) {
            const lastId = funcionarios.data[funcionarios.data.length - 1].id;
            return lastId + 1;
        } else {
            return 1;
        }
    }
}
