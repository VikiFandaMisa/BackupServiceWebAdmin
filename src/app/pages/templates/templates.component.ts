import { Component } from "@angular/core";
import {
    NbSortDirection,
    NbSortRequest,
    NbTreeGridDataSource,
    NbTreeGridDataSourceBuilder,
    NbDialogService,
} from "@nebular/theme";
import { Template, TemplateData } from "../../@core/data/templates";
import { TemplateFormComponent } from "./template-form/template-form.component";
import { ReturnAction } from "./template-form/return-action";

interface TreeNode {
    data: Template;
}

@Component({
    selector: "templates",
    templateUrl: "./templates.component.html",
    styleUrls: ["./templates.component.scss"],
})
export class TemplatesComponent {
    defaultColumns = ["name", "type", "start", "end", "paused"];
    allColumns = [...this.defaultColumns];
    data: TreeNode[];
    dataSource: NbTreeGridDataSource<Template>;
    sortColumn: string;
    sortDirection: NbSortDirection = NbSortDirection.NONE;

    constructor(
        private dataSourceBuilder: NbTreeGridDataSourceBuilder<Template>,
        private templateData: TemplateData,
        private dialogService: NbDialogService
    ) {
        this.loadTemplates();
    }

    loadTemplates() {
        this.templateData.getTemplates().subscribe((templates) => {
            this.data = [];
            templates.forEach((template) => this.data.push({ data: template }));
            this.createDataSource();
        });
    }

    createDataSource() {
        this.dataSource = this.dataSourceBuilder.create(this.data);
    }

    updateSort(sortRequest: NbSortRequest): void {
        this.sortColumn = sortRequest.column;
        this.sortDirection = sortRequest.direction;
    }

    getSortDirection(column: string): NbSortDirection {
        if (this.sortColumn === column) {
            return this.sortDirection;
        }
        return NbSortDirection.NONE;
    }

    getShowOn(index: number) {
        const minWithForMultipleColumns = 400;
        const nextColumnStep = 100;
        return minWithForMultipleColumns + nextColumnStep * index;
    }

    editClick(row: TreeNode) {
        const template: Template = row.data;
        let copiedSources = [];
        template.sources.forEach((source) => {
            copiedSources.push({
                id: source.id,
                directory: source.directory,
                network: source.network,
            });
        });
        let copiedTargets = [];
        template.targets.forEach((target) => {
            copiedTargets.push({
                id: target.id,
                directory: target.directory,
                network: target.network,
            });
        });
        this.dialogService
            .open(TemplateFormComponent, {
                context: {
                    template: {
                        id: template.id,
                        name: template.name,
                        period: template.period,
                        type: template.type,
                        targetFileType: template.targetFileType,
                        start: template.start,
                        end: template.end,
                        paused: template.paused,
                        retention: template.retention,
                        sources: copiedSources,
                        targets: copiedTargets,
                    },
                },
            })
            .onClose.subscribe((ret) => {
                if (ret != null) {
                    let template = ret[1];
                    if (ret[0] == ReturnAction.delete) this.delete(template);
                    else this.edit(template);
                }
            });
    }

    addClick() {
        const today: Date = new Date();
        today.setTime(Date.now());

        const nextWeek: Date = new Date();
        nextWeek.setTime(Date.now() + 1000 * 60 * 60 * 24 * 7);

        console.log(this.data);

        this.dialogService
            .open(TemplateFormComponent, {
                context: {
                    template: {
                        id: null,
                        name: null,
                        period: null,
                        type: 1,
                        targetFileType: 1,
                        start: today.toISOString(),
                        end: nextWeek.toISOString(),
                        paused: false,
                        retention: 1,
                        sources: [],
                        targets: [],
                    },
                },
            })
            .onClose.subscribe((ret) => {
                if (ret != null) this.add(ret[1]);
            });
    }

    add(template: Template) {
        template.id = 0;
        this.templateData.postTemplate(template).subscribe((_) => {
            this.data.push({ data: template });
            this.createDataSource();
        });
    }

    edit(template: Template) {
        for (let i = 0; i < this.data.length; i++) {
            if (this.data[i].data.id == template.id) {
                this.templateData.putTemplate(template).subscribe((_) => {
                    this.data[i].data = template;
                    this.createDataSource();
                });
                break;
            }
        }
    }

    delete(template: Template) {
        for (let i = 0; i < this.data.length; i++) {
            if (this.data[i].data.id == template.id) {
                this.templateData.deleteTemplate(template).subscribe((_) => {
                    this.data.splice(i, 1);
                    this.createDataSource();
                });
                break;
            }
        }
    }
}
