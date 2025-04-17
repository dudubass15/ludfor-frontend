import { Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
    selector: 'app-select',
    templateUrl: './select.component.html',
    styleUrls: ['./select.component.scss'],
})
export class SelectComponent {
    @Input() label: string = '';
    @Input() placeholder: string = '';
    @Input() required: boolean | null = null;
    @Input() id: string = '';
    @Input() control: FormControl = new FormControl('');
    @Input() options: Array<{ value: any; label: string, selected: boolean }> = [];
}
