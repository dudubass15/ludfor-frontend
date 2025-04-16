import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { provideEnvironmentNgxMask } from 'ngx-mask';
import {
    CurrencyMaskConfig,
    CurrencyMaskModule,
    CURRENCY_MASK_CONFIG,
} from 'ng2-currency-mask';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LayoutComponent } from './layout/layout.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

export const CustomCurrencyMaskConfig: CurrencyMaskConfig = {
    align: 'left',
    allowNegative: true,
    decimal: ',',
    precision: 2,
    prefix: 'R$ ',
    suffix: '',
    thousands: '.',
};

@NgModule({
    declarations: [AppComponent, LayoutComponent],
    imports: [BrowserModule, AppRoutingModule, CurrencyMaskModule, NgbModule],
    providers: [
        provideEnvironmentNgxMask(),
        { provide: CURRENCY_MASK_CONFIG, useValue: CustomCurrencyMaskConfig },
    ],
    bootstrap: [AppComponent],
})
export class AppModule {}
