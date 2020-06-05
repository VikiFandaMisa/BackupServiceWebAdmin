import { Component } from "@angular/core";
import {
    NbSortDirection,
    NbSortRequest,
    NbTreeGridDataSource,
    NbTreeGridDataSourceBuilder,
} from "@nebular/theme";
import { Template, TemplateData } from "../../@core/data/templates";

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
        private templateData: TemplateData
    ) {
        this.loadTemplates();
    }

    loadTemplates() {
        this.templateData.getTemplates().subscribe((templates) => {
            this.data = [];
            templates.forEach((template) => this.data.push({ data: template }));
            this.dataSource = this.dataSourceBuilder.create(this.data);
        });
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

    click(row) {
        console.log(row.data);
    }
}
