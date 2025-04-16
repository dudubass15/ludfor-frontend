import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
    selector: 'app-cadastro-usuario',
    templateUrl: './cadastro-usuario.component.html',
    styleUrls: ['./cadastro-usuario.component.scss'],
})
export class CadastroUsuarioComponent {
    public form: FormGroup = new FormGroup({
        username: new FormControl('', [Validators.required, Validators.minLength(5), Validators.maxLength(20)]),
        password: new FormControl('', [Validators.required, Validators.minLength(5), Validators.maxLength(20)]),
        nome_completo: new FormControl('', [Validators.required, Validators.minLength(5), Validators.maxLength(80)]),
        email: new FormControl('', [Validators.required, Validators.email, Validators.minLength(5), Validators.maxLength(60)]),
        telefone: new FormControl('', [Validators.minLength(10), Validators.maxLength(11)]),
    });

    public constructor(private router: Router) {}

    public previous(): void {
        this.router.navigate(['auth/login']);
    }
}
