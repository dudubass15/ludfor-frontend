import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';
import { FuncionarioInterface } from 'src/app/shared/interfaces/funcionario.interface';
import { FuncionariosService } from 'src/app/shared/services/funcionarios/funcionarios.service';
import { ToastService } from 'src/app/shared/services/toast/toast.service';

@Component({
    selector: 'app-funcionarios-lista',
    templateUrl: './funcionarios-lista.component.html',
    styleUrls: ['./funcionarios-lista.component.scss'],
})
export class FuncionariosListaComponent implements OnInit, OnDestroy {
    public loading = false;

    public funcionarios: FuncionarioInterface[] | null = null;

    private _destroy$ = new Subject<void>();

    public constructor(
        private router: Router,
        private activateRouter: ActivatedRoute,
        private funcionariosService: FuncionariosService,
        private toastService: ToastService
    ) {}

    public ngOnInit(): void {
        this.getFuncionarios();
    }

    public ngOnDestroy(): void {
        this._destroy$.next();
        this._destroy$.complete();
    }

    public getFuncionarios(): void {
        this.loading = true;
        const response = this.funcionariosService.getAll();
        if (response && response.success) {
            this.funcionarios = response.data;
        }
        this.loading = false;
    }

    public novoFuncionario(): void {
        this.router.navigate(['funcionarios/cadastro']);
    }

    public atualizarFuncionario(id: number | undefined): void {
        if (id) {
            const queryParams = { ...this.activateRouter.snapshot.queryParams, id };
            this.router.navigate(['funcionarios/editar'], { queryParams });
        } else {
            this.toastService.show('ID do funcionário não encontrado!', {
                classname: 'bg-danger text-light',
                delay: 10000,
            });
        }
    }

    public deletarFuncionario(id: number | undefined): void {
        if (id) {
            const response = this.funcionariosService.delete(id);
            if (response && response.success) {
                this.toastService.show('Funcionário deletado com sucesso!', {
                    classname: 'bg-success text-light',
                    delay: 10000,
                });
                this.getFuncionarios();
            }
        } else {
            this.toastService.show('ID do funcionário não encontrado!', {
                classname: 'bg-danger text-light',
                delay: 10000,
            });
        }
    }
}
