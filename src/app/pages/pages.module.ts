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
    NbDatepickerModule,
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
import { TemplateFormComponent } from "./templates/template-form/template-form.component";
import { NetworkFormComponent } from "./templates/template-form/network-form/network-form.component";
import { TimePickerComponent } from "../components/datetime-picker/time-picker/time-picker.component";
import { DatetimePickerComponent } from "../components/datetime-picker/datetime-picker.component";
import { PeriodPickerComponent } from "../components/period-picker/period-picker.component";
import { FormsModule } from "@angular/forms";
import { AccountFormComponent } from "./accounts/account-form/account-form.component";

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
        FormsModule,
        NbDatepickerModule,
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
        TemplateFormComponent,
        NetworkFormComponent,
        TimePickerComponent,
        AccountFormComponent,
        DatetimePickerComponent,
        PeriodPickerComponent,
    ],
})
export class PagesModule {}
