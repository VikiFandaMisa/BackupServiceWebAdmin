import { Component, OnInit } from "@angular/core";
import { NbDialogRef } from "@nebular/theme";
import {
    Template,
    backupType,
    backupFileType,
    BackupFileTypeUtils,
    BackupTypeUtils,
} from "../../../@core/data/templates";
import { Time } from '@angular/common';

export enum ReturnAction {
    submit,
    delete,
}

@Component({
    selector: "template-form",
    templateUrl: "template-form.component.html",
    styleUrls: ["template-form.component.scss"],
})
export class TemplateFormComponent implements OnInit {
    template: Template;
    time: Time = {
        hours: 1,
        minutes: 2,
    };
    backupTypes = backupType;
    backupFileTypes = backupFileType;

    constructor(protected ref: NbDialogRef<TemplateFormComponent>) {}

    ngOnInit() {
        console.log(this);
    }

    cancel() {
        this.ref.close();
    }

    submit() {
        console.log(this);
        this.ref.close();
    }

    delete() {
        this.ref.close([ReturnAction.delete, this.template]);
    }

    typeToString = BackupTypeUtils.toString;
    fileTypeToString = BackupFileTypeUtils.toString;
}
