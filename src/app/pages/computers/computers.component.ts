import { Component } from "@angular/core";
import {
    NbSortDirection,
    NbSortRequest,
    NbTreeGridDataSource,
    NbTreeGridDataSourceBuilder,
} from "@nebular/theme";
import { Computer, ComputerData } from "../../@core/data/computer";

interface TreeNode {
    data: Computer;
}

@Component({
    selector: "computers",
    templateUrl: "./computers.component.html",
    styleUrls: ["./computers.component.scss"],
})
export class ComputersComponent {
    defaultColumns = ["hostname", "ip", "mac", "lastSeen", "status"];
    allColumns = [...this.defaultColumns];
    data: TreeNode[];
    dataSource: NbTreeGridDataSource<Computer>;
    sortColumn: string;
    sortDirection: NbSortDirection = NbSortDirection.NONE;

    constructor(
        private dataSourceBuilder: NbTreeGridDataSourceBuilder<Computer>,
        private computerData: ComputerData
    ) {
        this.loadComputers();
    }

    loadComputers() {
        this.computerData.getComputers().subscribe((computers) => {
            this.data = [];
            computers.forEach((computer) => this.data.push({ data: computer }));
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
