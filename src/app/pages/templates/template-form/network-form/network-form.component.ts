import { Component } from "@angular/core";
import { NbDialogRef } from "@nebular/theme";
import { ReturnAction } from "../return-action";
import { NetworkSettings, networkMode, networkEncryption, NetworkModeUtils, NetworkEncryptionUtils } from '../../../../@core/data/path';

@Component({
    selector: "network-form",
    templateUrl: "network-form.component.html",
    styleUrls: ["network-form.component.scss"],
})
export class NetworkFormComponent {
    network: NetworkSettings;
    added: boolean;
    networkModes = networkMode;
    networkEncryptions = networkEncryption

    constructor(protected ref: NbDialogRef<NetworkFormComponent>) {}

    networkModeToString = NetworkModeUtils.toString;
    networkEncryptionToString = NetworkEncryptionUtils.toString;

    cancel() {
        this.ref.close();
    }

    submit() {
        this.ref.close([ReturnAction.submit, this.network]);
    }

    delete() {
        this.ref.close([ReturnAction.delete, this.network]);
    }
}
