import { Component } from "@angular/core";
import { NbDialogRef } from "@nebular/theme";
import { ReturnAction } from "../return-action";

@Component({
    selector: "network-form",
    templateUrl: "network-form.component.html",
    styleUrls: ["network-form.component.scss"],
})
export class NetworkFormComponent {
    added: boolean;

    constructor(protected ref: NbDialogRef<NetworkFormComponent>) {}

    cancel() {
        this.ref.close();
    }

    submit() {
        this.ref.close([ReturnAction.submit]);
    }

    delete() {
        this.ref.close([ReturnAction.delete]);
    }
}
