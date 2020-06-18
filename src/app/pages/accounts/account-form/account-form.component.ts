import { Component } from "@angular/core";
import { NbDialogRef } from "@nebular/theme";
import { Account } from "../../../@core/data/account";

export enum ReturnAction {
    submit,
    delete,
}

@Component({
    selector: "account-form",
    templateUrl: "account-form.component.html",
    styleUrls: ["account-form.component.scss"],
})
export class AccountFormComponent {
    account: Account;

    constructor(protected ref: NbDialogRef<AccountFormComponent>) {}

    cancel() {
        this.ref.close();
    }

    submit() {
        this.ref.close([ReturnAction.submit, this.account]);
    }

    delete() {
        this.ref.close([ReturnAction.delete, this.account]);
    }
}
