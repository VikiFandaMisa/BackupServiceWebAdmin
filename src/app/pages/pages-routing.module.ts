import { RouterModule, Routes } from "@angular/router";
import { NgModule } from "@angular/core";

import { PagesComponent } from "./pages.component";
import { LogComponent } from "./log/log.component";
import { AccountsComponent } from "./accounts/accounts.component";
import { ComputersComponent } from "./computers/computers.component";
import { JobsComponent } from "./jobs/jobs.component";
import { TemplatesComponent } from "./templates/templates.component";
import { NotFoundComponent } from "./miscellaneous/not-found/not-found.component";

const routes: Routes = [
    {
        path: "",
        component: PagesComponent,
        children: [
            {
                path: "log",
                component: LogComponent,
            },
            {
                path: "jobs",
                component: JobsComponent,
            },
            {
                path: "templates",
                component: TemplatesComponent,
            },
            {
                path: "computers",
                component: ComputersComponent,
            },
            {
                path: "accounts",
                component: AccountsComponent,
            },
            {
                path: "",
                redirectTo: "log",
                pathMatch: "full",
            },
            {
                path: "**",
                component: NotFoundComponent,
            },
        ],
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class PagesRoutingModule {}
