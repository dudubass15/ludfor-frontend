import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { ATIVO_OPTIONS } from 'src/app/shared/constants/ativos.constants';
import { ESTADOS } from 'src/app/shared/constants/estados.constants';
import { FuncionariosService } from 'src/app/shared/services/funcionarios/funcionarios.service';
import { ToastService } from 'src/app/shared/services/toast/toast.service';

@Component({
    selector: 'app-funcionarios-cadastro',
    templateUrl: './funcionarios-cadastro.component.html',
    styleUrls: ['./funcionarios-cadastro.component.scss'],
})
export class FuncionariosCadastroComponent implements OnInit, OnDestroy {
    public loading = false;

    private _destroy$ = new Subject<void>();

    public ativoOptions = ATIVO_OPTIONS;

    public estados = ESTADOS;

    public id: string | null;

    public form: FormGroup = new FormGroup({
        nome: new FormControl('', [Validators.required, Validators.minLength(5), Validators.maxLength(80)]),
        email: new FormControl('', [Validators.email, Validators.required, Validators.maxLength(60)]),
        celular: new FormControl('', [Validators.required, Validators.maxLength(11)]),
        ativo: new FormControl('', [Validators.required]),
        ramal: new FormControl('', [Validators.maxLength(10)]),
        bairro: new FormControl('', [Validators.required, Validators.maxLength(120)]),
        complemento: new FormControl('', [Validators.maxLength(120)]),
        logradouro: new FormControl('', [Validators.maxLength(80)]),
        numero: new FormControl('', [Validators.maxLength(15)]),
        cidade: new FormControl('', [Validators.required, Validators.maxLength(80)]),
        estado: new FormControl('', [Validators.required, Validators.maxLength(40)]),
    });

    public constructor(
        private router: Router,
        private employeesService: FuncionariosService,
        private toastService: ToastService,
        private activateRouter: ActivatedRoute
    ) {}

    public ngOnInit(): void {
        this.activateRouter.queryParams.pipe(takeUntil(this._destroy$)).subscribe((params) => {
            this.id = params['id'];
            if (this.id) {
                this.getEmployeeData(parseInt(this.id));
                return;
            }
        });

        this.setOptionDefaultAtivo();
        this.setOptionDefaultEstado();
    }

    public ngOnDestroy(): void {
        this._destroy$.next();
        this._destroy$.complete();
    }

    public previous(): void {
        this.router.navigate(['/']);
    }

    public setOptionDefaultAtivo(value?: boolean): void {
        if (value !== undefined) {
            this.ativoOptions.forEach((option) => option.selected = false);
            const option = this.ativoOptions.find((option) => option.value === value);
            if (option) option.selected = true;
            this.form.get('ativo')?.setValue(option?.label);
            return;
        }

        const option = this.ativoOptions.find((option) => option.selected);
        this.form.get('ativo')?.setValue(option?.selected);
    }

    public setOptionDefaultEstado(label?: string): void {
        if (label) {
            this.estados.forEach((estado) => estado.selected = false);
            const estado = this.estados.find((estado) => estado.label === label);
            if (estado) estado.selected = true;
            this.form.get('estado')?.setValue(estado?.label);
            return;
        }

        const estado = this.estados.find((estado) => estado.selected);
        this.form.get('estado')?.setValue(estado?.label);
    }

    public getEmployeeData(id: number): void {
        this.loading = true;
        const response = this.employeesService.getById(id);
        if (response && response.success && response.data) {
            this.form.patchValue({
                nome: response.data.nome,
                email: response.data.email,
                celular: response.data.celular,
                ramal: response.data.ramal,
                bairro: response.data.bairro,
                complemento: response.data.complemento,
                logradouro: response.data.logradouro,
                numero: response.data.numero,
                cidade: response.data.cidade,
            });
            this.setOptionDefaultAtivo(response.data.ativo === "true" as any ? true : false);
            this.setOptionDefaultEstado(response.data.estado);
        } else {
            this.toastService.show(response.error as string, {
                classname: 'bg-danger text-light',
                delay: 10000,
            });
        }
        this.loading = false;
    }

    public submit(): void {
        if (this.form.valid) {
            if (this.id) {
                this.loading = true;
                const response = this.employeesService.edit(parseInt(this.id), this.form.value);
                if (response && response.success) {
                    this.router.navigate(['/']);
                    setTimeout(() => {
                        this.toastService.show('Funcionário atualizado com sucesso', {
                            classname: 'bg-success text-light',
                            delay: 10000,
                        });
                    }, 1000);
                }
                this.loading = false;
            } else {
                const response = this.employeesService.add(this.form.value);
                if (response && response.success) {
                    this.router.navigate(['/']);
                    setTimeout(() => {
                        this.toastService.show('Funcionário cadastrado com sucesso', {
                            classname: 'bg-success text-light',
                            delay: 10000,
                        });
                    }, 1000);
                }
                this.loading = false;
            }
        } else {
            this.form.markAllAsTouched();
            this.form.updateValueAndValidity();
            this.toastService.show('Preencha todos os campos obrigatórios', {
                classname: 'bg-danger text-light',
                delay: 10000,
            });
        }
    }
}
