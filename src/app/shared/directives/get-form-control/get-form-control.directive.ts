import { Directive, Input } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Directive({
    selector: '[getFormControl]',
    exportAs: 'getFormControl'
})
export class GetFormControlDirective {
    @Input()
    public form: FormGroup = new FormGroup({});

    @Input()
    public field: string = '';

    public getFormControl(): FormControl {
        return this.form.get(this.field) as FormControl;
    }
}
