import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/shared/services/login/login.service';
import { ToastService } from 'src/app/shared/services/toast/toast.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
    public form: FormGroup = new FormGroup({
        username: new FormControl('', [
            Validators.required,
            Validators.minLength(5),
            Validators.maxLength(20),
        ]),
        password: new FormControl('', [
            Validators.required,
            Validators.maxLength(20),
        ]),
    });

    constructor(
        private toastService: ToastService,
        private loginService: LoginService,
        private router: Router
    ) {}

    public login() {
        if (this.form.valid) {
            const { username, password } = this.form.value;
            const response = this.loginService.login(username, password);
            if (response.success) {
                this.router.navigate(['/funcionarios']);
                setTimeout(() => {
                    this.toastService.show('Login realizado com sucesso!', {
                        classname: 'bg-success text-light',
                        delay: 10000,
                    });
                }, 1000);
            } else {
                this.toastService.show(response.error as string, {
                    classname: 'bg-danger text-light',
                    delay: 10000,
                });
            }
        } else {
            this.toastService.show('Ops! Erro interno.', {
                classname: 'bg-danger text-light',
                delay: 10000,
            });
        }
    }
}
