import { Component, OnInit } from "@angular/core";
import { NbDialogRef, NbDialogService } from "@nebular/theme";
import {
    Template,
    backupType,
    backupFileType,
    BackupFileTypeUtils,
    BackupTypeUtils,
} from "../../../@core/data/templates";
import { Time } from "@angular/common";
import { NetworkFormComponent } from "./network-form/network-form.component";
import { ReturnAction } from "./return-action";

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
    startTime: Time;
    endDate: Date;
    endTime: Time;

    constructor(
        protected ref: NbDialogRef<TemplateFormComponent>,
        private dialogService: NbDialogService
    ) {}

    ngOnInit() {
        this.startDate = new Date();
        this.startDate.setTime(Date.parse(this.template.start));
        this.startTime = {
            hours: this.startDate.getHours(),
            minutes: this.startDate.getMinutes(),
        };

        this.endDate = new Date();
        this.endDate.setTime(Date.parse(this.template.end));
        this.endTime = {
            hours: this.endDate.getHours(),
            minutes: this.endDate.getMinutes(),
        };
    }

    cancel() {
        this.ref.close();
    }

    submit() {
        let newSources = [];
        this.template.sources.forEach((source) => {
            if (source.directory != "") {
                newSources.push(source);
            }
        });
        this.template.sources = newSources;

        let newTargets = [];
        this.template.targets.forEach((target) => {
            if (target.directory != "") {
                newTargets.push(target);
            }
        });
        this.template.targets = newTargets;

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
        this.dialogService
            .open(NetworkFormComponent, {
                context: {
                    added: false,
                },
            })
            .onClose.subscribe((ret) => {});
    }
}
