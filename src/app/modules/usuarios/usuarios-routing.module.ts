import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from 'src/app/layout/layout.component';
import { UsuariosCadastroComponent } from './pages/usuarios-cadastro/usuarios-cadastro.component';

const routes: Routes = [
    {
        path: '',
        component: LayoutComponent,
        children: [
            {
                path: 'cadastro',
                component: UsuariosCadastroComponent
            }
        ]
    },
    {
        path: '',
        redirectTo: '/',
        pathMatch: 'full',
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class UsuariosRoutingModule {}
