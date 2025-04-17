import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { WrapperLoginComponent } from './wrapper-login/wrapper-login.component';
import { CadastroUsuarioComponent } from './pages/cadastro-usuario/cadastro-usuario.component';

const routes: Routes = [
    {
        path: '',
        component: WrapperLoginComponent,
        children: [
            {
                path: 'login',
                component: LoginComponent
            },
            {
                path: 'cadastro',
                component: CadastroUsuarioComponent
            },
            {
                path: '',
                redirectTo: 'login',
                pathMatch: 'full'
            }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class AutenticacaoRoutingModule {}
