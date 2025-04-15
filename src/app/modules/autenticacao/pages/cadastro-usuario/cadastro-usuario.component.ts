import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'app-cadastro-usuario',
    templateUrl: './cadastro-usuario.component.html',
    styleUrls: ['./cadastro-usuario.component.scss'],
})
export class CadastroUsuarioComponent {

    public constructor(private router: Router) {}

    public previous(): void {
        this.router.navigate(['auth/login']);
    }
}
