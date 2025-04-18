import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FuncionariosRoutingModule } from './funcionarios-routing.module';
import { FuncionariosListaComponent } from './pages/funcionarios-lista/funcionarios-lista.component';
import { FuncionariosCadastroComponent } from './pages/funcionarios-cadastro/funcionarios-cadastro.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InputModule } from 'src/app/shared/components/input/input.module';
import { SelectModule } from 'src/app/shared/components/select/select.module';
import { NgxMaskDirective, NgxMaskPipe } from 'ngx-mask';
import { GetFormControlModule } from 'src/app/shared/directives/get-form-control/get-form-control.module';

@NgModule({
    declarations: [
        FuncionariosListaComponent,
        FuncionariosCadastroComponent
    ],
    imports: [
        CommonModule,
        FuncionariosRoutingModule,
        FormsModule,
        ReactiveFormsModule,
        InputModule,
        SelectModule,
        NgxMaskDirective,
        NgxMaskPipe,
        GetFormControlModule
    ],
})
export class FuncionariosModule {}
