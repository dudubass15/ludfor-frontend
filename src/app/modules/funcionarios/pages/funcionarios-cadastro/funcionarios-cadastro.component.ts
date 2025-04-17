import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';
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
        private funcionarioService: FuncionariosService,
        private toastService: ToastService,
        private activateRouter: ActivatedRoute
    ) {}

    public ngOnInit(): void {
        this.activateRouter.queryParams.pipe(takeUntil(this._destroy$)).subscribe((params) => {
            this.id = params['id'];
            if (this.id) {
                this.getFuncionarioData(parseInt(this.id));
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
        this.router.navigate(['/funcionarios']);
    }

    public setOptionDefaultAtivo(): void {
        const option = this.ativoOptions.find((option) => option.selected);
        this.form.get('ativo')?.setValue(option?.selected);
    }

    public setOptionDefaultEstado(): void {
        const estado = this.estados.find((estado) => estado.selected);
        this.form.get('estado')?.setValue(estado?.label);
    }

    public getFuncionarioData(id: number): void {
        this.loading = true;
        const response = this.funcionarioService.getById(id);
        if (response && response.success && response.data) {
            this.form.patchValue({
                nome: response.data.nome,
                email: response.data.email,
                celular: response.data.celular,
                ativo: response.data.ativo,
                ramal: response.data.ramal,
                bairro: response.data.bairro,
                complemento: response.data.complemento,
                logradouro: response.data.logradouro,
                numero: response.data.numero,
                cidade: response.data.cidade,
                estado: response.data.estado,
            });
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
                const response = this.funcionarioService.edit(parseInt(this.id), this.form.value);
                if (response && response.success) {
                    this.router.navigate(['/funcionarios']);
                    setTimeout(() => {
                        this.toastService.show('Funcionário atualizado com sucesso', {
                            classname: 'bg-success text-light',
                            delay: 10000,
                        });
                    }, 1000);
                }
                this.loading = false;
            } else {
                const response = this.funcionarioService.add(this.form.value);
                if (response && response.success) {
                    this.router.navigate(['/funcionarios']);
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
