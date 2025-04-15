import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from 'src/app/layout/layout.component';
import { UsuariosListaComponent } from './pages/usuarios-lista/usuarios-lista.component';
import { UsuariosCadastroComponent } from './pages/usuarios-cadastro/usuarios-cadastro.component';

const routes: Routes = [
    {
        path: '',
        component: LayoutComponent,
        children: [
            {
                path: '',
                component: UsuariosListaComponent
            },
            {
                path: 'cadastro',
                component: UsuariosCadastroComponent
            }
        ]
    },
    {
        path: '',
        redirectTo: 'funcionarios',
        pathMatch: 'full',
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class UsuariosRoutingModule {}
