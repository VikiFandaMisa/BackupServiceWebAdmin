import { Component } from "@angular/core";
import {
    NbSortDirection,
    NbSortRequest,
    NbTreeGridDataSource,
    NbTreeGridDataSourceBuilder,
} from "@nebular/theme";
import { LogItem, LogItemData } from "../../@core/data/logItem";

interface TreeNode {
    data: LogItem;
}

@Component({
    selector: "log",
    templateUrl: "./log.component.html",
    styleUrls: ["./log.component.scss"],
})
export class LogComponent {
    defaultColumns = ["date", "jobID", "type", "message"];
    allColumns = [...this.defaultColumns];
    data: TreeNode[];
    dataSource: NbTreeGridDataSource<LogItem>;
    sortColumn: string;
    sortDirection: NbSortDirection = NbSortDirection.NONE;

    constructor(
        private dataSourceBuilder: NbTreeGridDataSourceBuilder<LogItem>,
        private logItemData: LogItemData
    ) {
        this.loadLog();
    }

    loadLog() {
        this.logItemData.getLogItems().subscribe((logs) => {
            this.data = [];
            logs.forEach((logItem) => this.data.push({ data: logItem }));
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
}
