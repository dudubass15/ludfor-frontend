import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AutenticacaoGuardService } from './guards/autenticacao.guard';

const routes: Routes = [
    {
        path: '',
        loadChildren: () =>
            import('./modules/funcionarios/funcionarios.module').then(
                (m) => m.FuncionariosModule
            ),
        canActivate: [AutenticacaoGuardService],
    },
    {
        path: 'auth',
        loadChildren: () =>
            import('./modules/autenticacao/autenticacao.module').then(
                (m) => m.AutenticacaoModule
            ),
    },
    {
        path: '**',
        redirectTo: '/',
        pathMatch: 'full',
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule {}
