import { NgModule } from "@angular/core";
import {
    NbMenuModule,
    NbCardModule,
    NbTreeGridModule,
    NbIconModule,
    NbInputModule,
    NbButtonModule,
    NbDialogModule,
    NbCheckboxModule,
    NbTabsetModule,
    NbPopoverModule,
    NbSelectModule,
    NbTooltipModule,
    NbRadioModule,
} from "@nebular/theme";

import { ThemeModule } from "../@theme/theme.module";
import { PagesComponent } from "./pages.component";
import { LogComponent } from "./log/log.component";
import { PagesRoutingModule } from "./pages-routing.module";
import { MiscellaneousModule } from "./miscellaneous/miscellaneous.module";
import { TemplatesComponent } from "./templates/templates.component";
import { JobsComponent } from "./jobs/jobs.component";
import { AccountsComponent } from "./accounts/accounts.component";
import { ComputersComponent } from "./computers/computers.component";
import { LoginRedirectComponent } from "../components/login-redirect/login-redirect.component";
import { JobFormComponent } from "./jobs/job-form/job-form.component";
import { ComputerFormComponent } from "./computers/computer-form/computer-form.component";

@NgModule({
    imports: [
        PagesRoutingModule,
        ThemeModule,
        NbMenuModule,
        MiscellaneousModule,
        NbCardModule,
        NbTreeGridModule,
        NbIconModule,
        NbInputModule,
        ThemeModule,
        NbDialogModule.forChild(),
        NbCheckboxModule,
        NbTabsetModule,
        NbPopoverModule,
        NbButtonModule,
        NbSelectModule,
        NbTooltipModule,
        NbRadioModule,
    ],
    declarations: [
        PagesComponent,
        LogComponent,
        TemplatesComponent,
        JobsComponent,
        JobFormComponent,
        AccountsComponent,
        ComputersComponent,
        LoginRedirectComponent,
        ComputerFormComponent,
    ],
})
export class PagesModule {}
