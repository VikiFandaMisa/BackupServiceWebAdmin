import { NgModule } from "@angular/core";
import { NbMenuModule } from "@nebular/theme";

import { ThemeModule } from "../@theme/theme.module";
import { PagesComponent } from "./pages.component";
import { LogComponent } from "./log/log.component";
import { PagesRoutingModule } from "./pages-routing.module";
import { MiscellaneousModule } from "./miscellaneous/miscellaneous.module";
import { TemplatesComponent } from './templates/templates.component';
import { JobsComponent } from './jobs/jobs.component';
import { AccountsComponent } from './accounts/accounts.component';
import { ComputersComponent } from './computers/computers.component';

@NgModule({
    imports: [
        PagesRoutingModule,
        ThemeModule,
        NbMenuModule,
        MiscellaneousModule,
    ],
    declarations: [PagesComponent, LogComponent, TemplatesComponent, JobsComponent, AccountsComponent, ComputersComponent],
})
export class PagesModule {}
