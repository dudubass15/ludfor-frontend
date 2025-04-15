import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';

@Component({
    selector: 'app-layout',
    templateUrl: './layout.component.html',
    styleUrls: ['./layout.component.scss'],
})
export class LayoutComponent {
    public fixed: boolean = false;

    private _destroy$ = new Subject<void>();

    public constructor(private router: Router) {}

    public ngOnDestroy(): void {
        this._destroy$.next();
        this._destroy$.complete();
    }

    public toGoAdmin(): void {
        // this.loginService.logout().pipe(takeUntil(this._destroy$)).subscribe({
        //     error: (error) => {
        //         if (error && error.status === 401) {
        //             localStorage.removeItem(configsEnum.TOKEN);
        //             this.router.navigate(['/admin/login']);
        //         }
        //     },
        //     complete: () => {
        //         localStorage.removeItem(configsEnum.TOKEN);
        //         this.router.navigate(['/admin/login']);
        //     }
        // });
    }
}
