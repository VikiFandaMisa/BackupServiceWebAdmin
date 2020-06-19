import { Component } from "@angular/core";
import {
    NbSortDirection,
    NbSortRequest,
    NbTreeGridDataSource,
    NbTreeGridDataSourceBuilder,
} from "@nebular/theme";
import { LogItem, LogItemData, MessageTypeUtils } from "../../@core/data/logItem";

function pad(number) {
    if (number < 10) {
        return "0" + number;
    }
    return number;
}

function formatDatetime(datetime: string): string {
    let date = new Date;
    date.setTime(Date.parse(datetime));
    return (
        pad(date.getDate()) +
        "." +
        pad(date.getMonth() + 1) +
        "." +
        date.getFullYear() +
        " " +
        pad(date.getHours()) +
        ":" +
        pad(date.getMinutes())
    );
}

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

    formatRowData(data: LogItem, column: string) {
        if (column == "date")
            return formatDatetime(data[column]);
        if (column == "type")
            return MessageTypeUtils.toString(data[column]);
        return data[column];
    }
}
