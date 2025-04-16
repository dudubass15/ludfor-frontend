import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AutenticacaoRoutingModule } from './autenticacao-routing.module';
import { LoginComponent } from './pages/login/login.component';
import { WrapperLoginComponent } from './wrapper-login/wrapper-login.component';
import { RouterModule } from '@angular/router';
import { CadastroUsuarioComponent } from './pages/cadastro-usuario/cadastro-usuario.component';
import { NgxMaskDirective, NgxMaskPipe } from 'ngx-mask';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InputModule } from 'src/app/shared/components/input/input.module';
import { GetFormControlDirective } from 'src/app/shared/directives/get-form-control/get-form-control.directive';

@NgModule({
    declarations: [LoginComponent, WrapperLoginComponent, CadastroUsuarioComponent, GetFormControlDirective],
    imports: [
        CommonModule,
        AutenticacaoRoutingModule,
        RouterModule,
        NgxMaskDirective,
        NgxMaskPipe,
        FormsModule,
        ReactiveFormsModule,
        InputModule,
    ],
})
export class AutenticacaoModule {}
