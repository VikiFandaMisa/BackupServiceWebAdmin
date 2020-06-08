import { Component } from "@angular/core";
import {
    NbSortDirection,
    NbSortRequest,
    NbTreeGridDataSource,
    NbTreeGridDataSourceBuilder,
} from "@nebular/theme";
import { Account, AccountData } from "../../@core/data/account";

interface TreeNode {
    data: Account;
}

@Component({
    selector: "accounts",
    templateUrl: "./accounts.component.html",
    styleUrls: ["./accounts.component.scss"],
})
export class AccountsComponent {
    defaultColumns = ["username", "email", "admin"];
    allColumns = [...this.defaultColumns];
    data: TreeNode[];
    dataSource: NbTreeGridDataSource<Account>;
    sortColumn: string;
    sortDirection: NbSortDirection = NbSortDirection.NONE;

    constructor(
        private dataSourceBuilder: NbTreeGridDataSourceBuilder<Account>,
        private accountData: AccountData
    ) {
        this.loadAccounts();
    }

    loadAccounts() {
        this.accountData.getAccounts().subscribe((accounts) => {
            this.data = [];
            accounts.forEach((account) => this.data.push({ data: account }));
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

    editClick() {}

    addClick() {}
}
