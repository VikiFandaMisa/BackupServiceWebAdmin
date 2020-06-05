import { Component } from "@angular/core";
import { NbDialogRef } from "@nebular/theme";
import { Job } from "../../../@core/data/job";

export interface ComputerOption {
    id: number;
    hostname: string;
}

export interface TemplateOption {
    id: number;
    name: string;
}

@Component({
    selector: "job-form",
    templateUrl: "job-form.component.html",
    styleUrls: ["job-form.component.scss"],
})
export class JobFormComponent {
    job: Job;
    computers: ComputerOption[];
    templates: TemplateOption[];

    constructor(protected ref: NbDialogRef<JobFormComponent>) {}

    cancel() {
        this.ref.close();
    }

    submit() {
        this.ref.close(this.job);
    }
}
