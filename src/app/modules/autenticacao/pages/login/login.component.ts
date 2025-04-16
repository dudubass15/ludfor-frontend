import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
    public form: FormGroup = new FormGroup({
        username: new FormControl('', [Validators.required, Validators.minLength(5), Validators.maxLength(20)]),
        password: new FormControl('', [Validators.required, Validators.maxLength(20)]),
    });
}
