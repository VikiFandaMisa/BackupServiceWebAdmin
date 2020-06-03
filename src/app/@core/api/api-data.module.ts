import { NgModule, ModuleWithProviders } from "@angular/core";
import { CommonModule } from "@angular/common";

import { AccountService } from "./accounts.service";
import { TokenService } from "./tokens.service";

const SERVICES = [
    AccountService,
    TokenService
];

@NgModule({
    imports: [CommonModule],
    providers: [...SERVICES],
})
export class ApiDataModule {
    static forRoot(): ModuleWithProviders<ApiDataModule> {
        return {
            ngModule: ApiDataModule,
            providers: [...SERVICES],
        };
    }
}
