import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FuncionariosRoutingModule } from './funcionarios-routing.module';
import { FuncionariosListaComponent } from './pages/funcionarios-lista/funcionarios-lista.component';
import { FuncionariosCadastroComponent } from './pages/funcionarios-cadastro/funcionarios-cadastro.component';

@NgModule({
    declarations: [
    FuncionariosListaComponent,
    FuncionariosCadastroComponent
  ],
    imports: [CommonModule, FuncionariosRoutingModule],
})
export class FuncionariosModule {}
