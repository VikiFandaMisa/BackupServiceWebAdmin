import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';

import { AccountsService } from 'src/app/services/accounts.service';
import { AccountModel } from 'src/app/models/account';
import { AccountsTableDatasource } from './accounts-table.datasource';

@Component({
  selector: 'app-accounts-table',
  templateUrl: './accounts-table.component.html',
  styleUrls: ['./accounts-table.component.scss']
})
export class AccountsTableComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatTable) table: MatTable<AccountModel>;

  constructor(private acc:AccountsService) { }
  
  datasource: AccountsTableDatasource;

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['id', 'username', 'email'];

  ngOnInit() {
    this.datasource = new AccountsTableDatasource();
    this.acc.getAccounts().subscribe(accounts => {
      this.datasource.data = accounts;
      this.datasource.refresh();
    });
  }

  ngAfterViewInit() {
    this.datasource.sort = this.sort;
    this.datasource.paginator = this.paginator;
    this.table.dataSource = this.datasource;
  }
}