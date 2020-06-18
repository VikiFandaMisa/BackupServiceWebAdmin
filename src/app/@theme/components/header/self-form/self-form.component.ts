import { Component } from "@angular/core";
import { NbDialogRef } from "@nebular/theme";
import { Account } from '../../../../@core/data/account';

@Component({
    selector: "self-form",
    templateUrl: "self-form.component.html",
    styleUrls: ["self-form.component.scss"],
})
export class SelfFormComponent {
    account: Account;

    constructor(protected ref: NbDialogRef<SelfFormComponent>) {}

    cancel() {
        this.ref.close();
    }

    submit() {
        this.ref.close(this.account);
    }
}
