import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
    {
        path: 'funcionarios',
        loadChildren: () =>
            import('./modules/funcionarios/funcionarios.module').then(
                (m) => m.FuncionariosModule
            ),
    },
    {
        path: 'usuarios',
        loadChildren: () =>
            import('./modules/usuarios/usuarios.module').then(
                (m) => m.UsuariosModule
            ),
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
        redirectTo: '/funcionarios',
        pathMatch: 'full',
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule {}
