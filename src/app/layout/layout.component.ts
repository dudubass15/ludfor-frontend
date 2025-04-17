import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { LoginService } from '../shared/services/login/login.service';
import { ToastService } from '../shared/services/toast/toast.service';

@Component({
    selector: 'app-layout',
    templateUrl: './layout.component.html',
    styleUrls: ['./layout.component.scss'],
})
export class LayoutComponent {
    private _destroy$ = new Subject<void>();

    public constructor(
        private router: Router,
        private loginService: LoginService,
        private toastService: ToastService
    ) {}

    public ngOnDestroy(): void {
        this._destroy$.next();
        this._destroy$.complete();
    }

    public logout(): void {
        const response = this.loginService.logout();
        if (response && response.success) {
            this.router.navigate(['/auth/login']);
            setTimeout(() => {
                this.toastService.show('Logout realizado com sucesso!', {
                    classname: 'bg-success text-light',
                    delay: 10000,
                });
            }, 1000);
        }
    }
}
