import { Component, OnInit } from "@angular/core";
import { NbDialogRef, NbDialogService } from "@nebular/theme";
import {
    Template,
    backupType,
    backupFileType,
    BackupFileTypeUtils,
    BackupTypeUtils,
} from "../../../@core/data/templates";
import { NetworkFormComponent } from "./network-form/network-form.component";
import { ReturnAction } from "./return-action";
import { NetworkSettings } from "../../../@core/data/path";

function pad(number) {
    if (number < 10) {
        return "0" + number;
    }
    return number;
}

function dateToString(date: Date): string {
    return (
        date.getFullYear() +
        "-" +
        pad(date.getMonth() + 1) +
        "-" +
        pad(date.getDate()) +
        "T" +
        pad(date.getHours()) +
        ":" +
        pad(date.getMinutes()) +
        ":" +
        pad(date.getSeconds())
    );
}

@Component({
    selector: "template-form",
    templateUrl: "template-form.component.html",
    styleUrls: ["template-form.component.scss"],
})
export class TemplateFormComponent implements OnInit {
    template: Template;
    backupTypes = backupType;
    backupFileTypes = backupFileType;
    startDate: Date;
    endDate: Date;

    constructor(
        protected ref: NbDialogRef<TemplateFormComponent>,
        private dialogService: NbDialogService
    ) {}

    ngOnInit() {
        this.startDate = new Date();
        this.startDate.setTime(Date.parse(this.template.start));

        this.endDate = new Date();
        this.endDate.setTime(Date.parse(this.template.end));
    }

    cancel() {
        this.ref.close();
    }

    submit() {
        this.template.start = dateToString(this.startDate);
        this.template.end = dateToString(this.endDate);

        this.ref.close([ReturnAction.submit, this.template]);
    }

    delete() {
        let newSources = [];
        this.template.sources.forEach((source) => {
            if (source.id != 0) {
                newSources.push(source);
            }
        });
        this.template.sources = newSources;

        let newTargets = [];
        this.template.targets.forEach((target) => {
            if (target.id != 0) {
                newTargets.push(target);
            }
        });
        this.template.targets = newTargets;

        this.ref.close([ReturnAction.delete, this.template]);
    }

    typeToString = BackupTypeUtils.toString;
    fileTypeToString = BackupFileTypeUtils.toString;

    addTarget() {
        this.template.targets.push({
            id: 0,
            directory: "",
            network: null,
        });
    }

    removeTarget(i: number) {
        this.template.targets.splice(i, 1);
    }

    addSource() {
        this.template.sources.push({
            id: 0,
            directory: "",
            network: null,
        });
    }

    removeSource(i: number) {
        this.template.sources.splice(i, 1);
    }

    targetNework(i: number) {
        let path = this.template.targets[i];

        let network: NetworkSettings;
        let added: boolean;
        if (path.network == null) {
            added = true;
            network = {
                server: "",
                name: "",
                password: "",
                mode: 1,
                encryption: 1,
            };
        } else {
            added = false;
            network = {
                server: path.network.server,
                name: path.network.name,
                password: path.network.password,
                mode: path.network.mode,
                encryption: path.network.encryption,
            };
        }

        this.dialogService
            .open(NetworkFormComponent, {
                context: {
                    added: added,
                    network: network,
                },
            })
            .onClose.subscribe((ret) => {
                if (ret != null && ret[0] == ReturnAction.submit)
                    path.network = ret[1];
                else if (ret != null && ret[0] == ReturnAction.delete)
                    path.network = null;
            });
    }
}
