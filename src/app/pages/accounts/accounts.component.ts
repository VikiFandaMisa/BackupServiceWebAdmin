import { Component } from "@angular/core";
import {
    NbSortDirection,
    NbSortRequest,
    NbTreeGridDataSource,
    NbTreeGridDataSourceBuilder,
    NbDialogService,
} from "@nebular/theme";
import { Account, AccountData } from "../../@core/data/account";
import { Job } from "../../@core/data/job";
import {
    AccountFormComponent,
    ReturnAction,
} from "./account-form/account-form.component";

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

    jobData: any;

    constructor(
        private dataSourceBuilder: NbTreeGridDataSourceBuilder<Account>,
        private accountData: AccountData,
        private dialogService: NbDialogService
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

    editClick(row: TreeNode) {
        const account: Account = row.data;
        this.dialogService
            .open(AccountFormComponent, {
                context: {
                    account: {
                        id: account.id,
                        username: account.username,
                        password: account.password,
                        admin: account.admin,
                        email: account.email,
                        sendReports: account.sendReports,
                    },
                },
            })
            .onClose.subscribe((ret) => {
                if (ret != null) {
                    let account = ret[1];
                    if (ret[0] == ReturnAction.delete) this.delete(account);
                    else this.edit(account);
                }
            });
    }

    edit(account: Account) {
        for (let i = 0; i < this.data.length; i++) {
            if (this.data[i].data.id == account.id) {
                this.accountData.putAccount(account).subscribe((_) => {
                    this.data[i].data = account;
                    this.createDataSource();
                });
                break;
            }
        }
    }

    delete(account: Account) {
        for (let i = 0; i < this.data.length; i++) {
            if (this.data[i].data.id == account.id) {
                this.accountData.deleteAccount(account).subscribe((_) => {
                    this.data.splice(i, 1);
                    this.createDataSource();
                });
                break;
            }
        }
    }

    addClick() {
        this.dialogService
            .open(AccountFormComponent, {
                context: {
                    account: {
                        id: null,
                        username: null,
                        password: null,
                        admin: false,
                        email: null,
                        sendReports: true,
                    },
                },
            })
            .onClose.subscribe((ret) => {
                if (ret != null) this.add(ret[1]);
            });
    }

    add(account: Account) {
        account.id = 0;
        this.accountData.postAccount(account).subscribe((ret) => {
            this.data.push({ data: ret });
            this.createDataSource();
        });
        this.loadAccounts();
    }
    createDataSource() {
        this.dataSource = this.dataSourceBuilder.create(this.data);
    }
}
