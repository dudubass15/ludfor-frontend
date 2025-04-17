import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsuariosCadastroComponent } from './pages/usuarios-cadastro/usuarios-cadastro.component';
import { UsuariosRoutingModule } from './usuarios-routing.module';

@NgModule({
    declarations: [UsuariosCadastroComponent],
    imports: [CommonModule, UsuariosRoutingModule],
})
export class UsuariosModule {}
