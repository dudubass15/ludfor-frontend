import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AutenticacaoRoutingModule } from './autenticacao-routing.module';
import { LoginComponent } from './pages/login/login.component';
import { WrapperLoginComponent } from './wrapper-login/wrapper-login.component';
import { RouterModule } from '@angular/router';
import { CadastroUsuarioComponent } from './pages/cadastro-usuario/cadastro-usuario.component';
import { NgxMaskDirective, NgxMaskPipe } from 'ngx-mask';

@NgModule({
    declarations: [LoginComponent, WrapperLoginComponent, CadastroUsuarioComponent],
    imports: [
        CommonModule,
        AutenticacaoRoutingModule,
        RouterModule,
        NgxMaskDirective,
        NgxMaskPipe,
    ],
})
export class AutenticacaoModule {}
