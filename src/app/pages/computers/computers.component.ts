import { Component } from "@angular/core";
import {
    NbSortDirection,
    NbSortRequest,
    NbTreeGridDataSource,
    NbTreeGridDataSourceBuilder,
    NbDialogService,
} from "@nebular/theme";
import { Computer, ComputerData } from "../../@core/data/computer";
import { ComputerFormComponent } from "./computer-form/computer-form.component";

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
    allColumns = this.defaultColumns;
    data: TreeNode[];
    dataSource: NbTreeGridDataSource<Computer>;
    sortColumn: string;
    sortDirection: NbSortDirection = NbSortDirection.NONE;

    constructor(
        private dataSourceBuilder: NbTreeGridDataSourceBuilder<Computer>,
        private computerData: ComputerData,
        private dialogService: NbDialogService
    ) {
        this.loadComputers();
    }

    loadComputers() {
        this.computerData.getComputers().subscribe((computers) => {
            this.data = [];
            computers.forEach((computer) => this.data.push({ data: computer }));
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
        const computer: Computer = row.data;
        this.dialogService
            .open(ComputerFormComponent, {
                context: {
                    computer: {
                        id: computer.id,
                        hostname: computer.hostname,
                        lastSeen: computer.lastSeen,
                        ip: computer.ip,
                        mac: computer.mac,
                        status: computer.status,
                    },
                },
            })
            .onClose.subscribe((computer) => {
                if (computer != null) this.edit(computer);
            });
    }

    edit(computer: Computer) {
        for (let i = 0; i < this.data.length; i++) {
            if (this.data[i].data.id == computer.id) {
                this.computerData.putComputer(computer).subscribe((_) => {
                    this.data[i].data = computer;
                    this.createDataSource();
                });
                break;
            }
        }
    }
}
