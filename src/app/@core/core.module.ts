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
    NbDummyAuthStrategy,
    NbPasswordAuthStrategy,
    NbAuthJWTToken,
} from "@nebular/auth";
import { NbSecurityModule, NbRoleProvider } from "@nebular/security";
import { of as observableOf } from "rxjs";

import { throwIfAlreadyLoaded } from "./module-import-guard";
import { LayoutService, PlayerService, StateService } from "./utils";

import { AccountData } from "./data/accounts";
import { TokenData } from "./data/tokens";

import { AccountService } from "./api/accounts.service";
import { TokenService } from "./api/tokens.service";
import { RippleService } from "./utils/ripple.service";
import { ApiDataModule } from "./api/api-data.module";

const socialLinks = [
    {
        url: "https://github.com/VikiFandaMisa/BackupServiceWebAdmin",
        target: "_blank",
        icon: "github",
    },
];

const DATA_SERVICES = [
    { provide: AccountData, useClass: AccountService },
    { provide: TokenData, useClass: TokenService },
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
            NbDummyAuthStrategy.setup({
                name: "auth",
                delay: 3000,
            }),
        ],
        forms: {
            login: {
                redirectDelay: 0,
                strategy: "auth",
                rememberMe: false,
                showMessages: {
                    success: false,
                    error: true,
                },
            },
        },
    }).providers,

    NbSecurityModule.forRoot({
        accessControl: {
            guest: {
                view: "*",
            },
            user: {
                parent: "guest",
                create: "*",
                edit: "*",
                remove: "*",
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
