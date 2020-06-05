import { Component } from "@angular/core";
import { NbDialogRef } from "@nebular/theme";
import { Job } from '../../../@core/data/job';

@Component({
    selector: "job-form",
    templateUrl: "job-form.component.html",
    styleUrls: ["job-form.component.scss"],
})
export class JobFormComponent {
    job: Job;

    constructor(protected ref: NbDialogRef<JobFormComponent>) {
        console.log(this.job);
    }

    cancel() {
        this.ref.close();
    }

    submit(name) {
        this.ref.close(name);
    }
}
