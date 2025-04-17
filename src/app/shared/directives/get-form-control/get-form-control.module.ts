import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GetFormControlDirective } from './get-form-control.directive';

@NgModule({
    declarations: [GetFormControlDirective],
    imports: [CommonModule],
    exports: [GetFormControlDirective]
})
export class GetFormControlModule {}
