import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from 'src/app/layout/layout.component';
import { FuncionariosListaComponent } from './pages/funcionarios-lista/funcionarios-lista.component';
import { FuncionariosCadastroComponent } from './pages/funcionarios-cadastro/funcionarios-cadastro.component';

const routes: Routes = [
    {
        path: '',
        component: LayoutComponent,
        children: [
            {
                path: '',
                component: FuncionariosListaComponent
            },
            {
                path: 'cadastro',
                component: FuncionariosCadastroComponent
            },
            {
                path: 'editar',
                component: FuncionariosCadastroComponent
            }
        ],
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
export class FuncionariosRoutingModule {}
