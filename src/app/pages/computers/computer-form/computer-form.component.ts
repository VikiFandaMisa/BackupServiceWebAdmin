import { Component } from "@angular/core";
import { NbDialogRef } from "@nebular/theme";
import { Computer, ComputerStatus, ComputerStatusUtils } from "../../../@core/data/computer";

@Component({
    selector: "computer-form",
    templateUrl: "computer-form.component.html",
    styleUrls: ["computer-form.component.scss"],
})
export class ComputerFormComponent {
    computer: Computer;
    computerStatuses = ComputerStatus;

    constructor(protected ref: NbDialogRef<ComputerFormComponent>) {}

    cancel() {
        this.ref.close();
    }

    submit() {
        this.ref.close(this.computer);
    }

    statusToString = ComputerStatusUtils.toString;
}
