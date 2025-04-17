import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastService } from 'src/app/shared/services/toast/toast.service';
import { UsuariosService } from 'src/app/shared/services/usuarios/usuarios.service';

@Component({
    selector: 'app-cadastro-usuario',
    templateUrl: './cadastro-usuario.component.html',
    styleUrls: ['./cadastro-usuario.component.scss'],
})
export class CadastroUsuarioComponent {
    public form: FormGroup = new FormGroup({
        username: new FormControl('', [
            Validators.required,
            Validators.minLength(5),
            Validators.maxLength(20),
        ]),
        password: new FormControl('', [
            Validators.required,
            Validators.minLength(5),
            Validators.maxLength(20),
        ]),
        nome_completo: new FormControl('', [
            Validators.required,
            Validators.minLength(5),
            Validators.maxLength(80),
        ]),
        email: new FormControl('', [
            Validators.required,
            Validators.email,
            Validators.minLength(5),
            Validators.maxLength(60),
        ]),
        telefone: new FormControl('', [
            Validators.minLength(10),
            Validators.maxLength(11),
        ]),
    });

    public constructor(
        private router: Router,
        private usuarioService: UsuariosService,
        private toastService: ToastService
    ) {}

    public previous(): void {
        this.router.navigate(['auth/login']);
    }

    public submit(): void {
        if (this.form.valid) {
            const usuario = this.form.value;
            const response = this.usuarioService.add(usuario);
            if (response && response.success) {
                this.router.navigate(['auth/login']);

                setTimeout(() => {
                    this.toastService.show(
                        'Usuário cadastrado com sucesso.',
                        { classname: 'bg-success text-light', delay: 10000 }
                    );
                }, 1000);

            } else {
                this.toastService.show(
                    response.error as string,
                    { classname: 'bg-danger text-light', delay: 10000 }
                );
                this.form.markAllAsTouched
                this.form.controls['username'].setErrors({ registered: true });
                this.form.updateValueAndValidity();
            }
        } else {
            this.toastService.show(
                'Ops! Não foi possível realizar o cadastrado.',
                { classname: 'bg-danger text-light', delay: 10000 }
            );
        }
    }
}
