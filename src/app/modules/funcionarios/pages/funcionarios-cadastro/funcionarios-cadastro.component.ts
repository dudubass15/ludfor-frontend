import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { ATIVO_OPTIONS } from 'src/app/shared/constants/ativos.constants';
import { ESTADOS } from 'src/app/shared/constants/estados.constants';

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

    public constructor(private router: Router) {}

    public ngOnInit(): void {
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

    public save(): void {}
}
