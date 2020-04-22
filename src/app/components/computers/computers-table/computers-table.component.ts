import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';

import { ComputersService } from 'src/app/services/computers.service';
import { ComputerModel } from 'src/app/models/computer';
import { ComputersTableDatasource } from './computers-table.datasource';

@Component({
  selector: 'app-computers-table',
  templateUrl: './computers-table.component.html',
  styleUrls: ['./computers-table.component.scss']
})
export class ComputersTableComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatTable) table: MatTable<ComputerModel>;

  constructor(private computersService: ComputersService) { }
  
  datasource: ComputersTableDatasource;

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['id', 'hostname', 'ip', 'status'];

  ngOnInit() {
    this.datasource = new ComputersTableDatasource();
    this.computersService.fetchComputers().subscribe(computers => {
      this.datasource.data = computers;
      this.datasource.refresh();
    });
  }

  ngAfterViewInit() {
    this.datasource.sort = this.sort;
    this.datasource.paginator = this.paginator;
    this.table.dataSource = this.datasource;
  }
}