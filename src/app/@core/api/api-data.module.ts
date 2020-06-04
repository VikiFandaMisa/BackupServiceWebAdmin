import { NgModule, ModuleWithProviders } from "@angular/core";
import { CommonModule } from "@angular/common";

import { AccountService } from "./account.service";
import { ComputerService } from "./computer.service";
import { JobService } from "./job.service";
import { LogService } from "./log.service";
import { TemplateService } from "./template.service";

const SERVICES = [
    AccountService,
    ComputerService,
    JobService,
    LogService,
    TemplateService,
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
