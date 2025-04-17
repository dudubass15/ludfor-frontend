import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { LoginService } from '../shared/services/login/login.service';

@Injectable()
export class AutenticacaoGuardService implements CanActivate {
    public constructor(
        private loginService: LoginService,
        private router: Router
    ) {}

    public canActivate(): boolean {
        if (!this.loginService.isLogged().data) {
            this.router.navigate(['/auth/login']);
            return false;
        }
        return true;
    }
}
