import {
    ModuleWithProviders,
    NgModule,
    Optional,
    SkipSelf,
} from "@angular/core";
import { CommonModule } from "@angular/common";
import { MAT_RIPPLE_GLOBAL_OPTIONS } from "@angular/material/core";
import {
    NbAuthModule,
    NbPasswordAuthStrategy,
    NbAuthJWTToken,
} from "@nebular/auth";
import { NbSecurityModule, NbRoleProvider } from "@nebular/security";
import { of as observableOf } from "rxjs";

import { throwIfAlreadyLoaded } from "./module-import-guard";
import { LayoutService, PlayerService, StateService } from "./utils";

import { AccountData } from "./data/account";
import { ComputerData } from "./data/computer";
import { JobData } from "./data/job";
import { LogItemData } from "./data/logItem";
import { TemplateData } from "./data/templates";
import {  } from "./data/networkSettings";
import {  } from "./data/period";

import { AccountService } from "./api/account.service";
import { ComputerService } from "./api/computer.service";
import { JobService } from "./api/job.service";
import { LogService } from "./api/log.service";
import { TemplateService } from "./api/template.service";
import { RippleService } from "./utils/ripple.service";
import { ApiDataModule } from "./api/api-data.module";

const DATA_SERVICES = [
    { provide: AccountData, useClass: AccountService },
    { provide: ComputerData, useClass: ComputerService },
    { provide: JobData, useClass: JobService },
    { provide: LogItemData, useClass: LogService },
    { provide: TemplateData, useClass: TemplateService },
    { provide: MAT_RIPPLE_GLOBAL_OPTIONS, useExisting: RippleService },
];

export class NbSimpleRoleProvider extends NbRoleProvider {
    getRole() {
        // here you could provide any role based on any auth flow
        return observableOf("guest");
    }
}

export const NB_CORE_PROVIDERS = [
    ...ApiDataModule.forRoot().providers,
    ...DATA_SERVICES,
    ...NbAuthModule.forRoot({
        strategies: [
            NbPasswordAuthStrategy.setup({
                name: "email",
                token: {
                    class: NbAuthJWTToken,
                    key: "token",
                },
                baseEndpoint: "",
                login: {
                    endpoint: "/api/token/user",
                    method: "post",
                    redirect: {
                        success: "/pages/log",
                        failure: "",
                    },
                },
                logout: {
                    endpoint: "/api/token/",
                    method: "delete",
                    redirect: {
                        success: "/auth/login",
                        failure: "/auth/login",
                    },
                },
            }),
        ],
        forms: {
            login: {
                redirectDelay: 0,
                strategy: "email",
                rememberMe: false,
                showMessages: {
                    success: false,
                    error: true,
                },
            },
            logout: {
                redirectDelay: 0,
                strategy: "email",
            },
        },
    }).providers,

    NbSecurityModule.forRoot({
        accessControl: {
            guest: {
                view: "*",
            },
        },
    }).providers,
    {
        provide: NbRoleProvider,
        useClass: NbSimpleRoleProvider,
    },
    LayoutService,
    PlayerService,
    StateService,
];

@NgModule({
    imports: [CommonModule],
    exports: [NbAuthModule],
    declarations: [],
})
export class CoreModule {
    constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
        throwIfAlreadyLoaded(parentModule, "CoreModule");
    }

    static forRoot(): ModuleWithProviders<CoreModule> {
        return {
            ngModule: CoreModule,
            providers: [...NB_CORE_PROVIDERS],
        };
    }
}
