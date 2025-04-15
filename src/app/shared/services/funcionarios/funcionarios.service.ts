import { Injectable } from '@angular/core';
import { delay, map, Observable, of } from 'rxjs';
import { FuncionarioInterface } from '../../interfaces/funcionario.interface';
import { StorageService } from '../storage/storage.service';

@Injectable({
    providedIn: 'root',
})
export class FuncionariosService {
    public constructor(private storage: StorageService) {}

    public getAll(): Observable<FuncionarioInterface[]> {
        return of([]).pipe(delay(1000));
    }

    public getById(id: number): Observable<FuncionarioInterface | null> {
        return of([]).pipe(
            delay(1000),
            map((response) => (response as FuncionarioInterface[]).find((item) => item.id === id) || null)
        );
    }
}
