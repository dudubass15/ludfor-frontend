import { Component, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { FuncionarioInterface } from 'src/app/shared/interfaces/funcionario.interface';
import { FuncionariosService } from 'src/app/shared/services/funcionarios/funcionarios.service';

@Component({
    selector: 'app-funcionarios-lista',
    templateUrl: './funcionarios-lista.component.html',
    styleUrls: ['./funcionarios-lista.component.scss'],
})
export class FuncionariosListaComponent implements OnDestroy {
    public loading = false;

    public funcionarios: FuncionarioInterface[] | null = null;

    private _destroy$ = new Subject<void>();

    public constructor(
        private router: Router,
        private activateRouter: ActivatedRoute,
        private funcionariosService: FuncionariosService
    ) {}

    public ngOnDestroy(): void {
        this._destroy$.next();
        this._destroy$.complete();
    }

    public novoFuncionario(): void {
        this.router.navigate(['funcionarios/cadastro']);
    }

    public atualizarFuncionario(id: number | undefined): void {
        if (id) {
            const queryParams = { ...this.activateRouter.snapshot.queryParams, id };
            this.router.navigate(['admin/assinaturas/editar'], { queryParams });
        }
    }

    public deletarFuncionario(id: number | undefined): void {
        if (id) {
            // this.assinaturasService.delete(uuid).pipe(takeUntil(this._destroy$)).subscribe({
            //     next: (response) => {
            //         if (response && response.success) {
            //             this.getAssinaturas();
            //         }
            //     }
            // });
        }
    }
}
