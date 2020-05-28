import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { LogsTableDataSource,} from './logs-table-datasource';

import { LogService } from 'src/app/services/log.service';
import { LogItemModel } from 'src/app/models/logItem';

@Component({
  selector: 'app-logs-table',
  templateUrl: './logs-table.component.html',
  styleUrls: ['./logs-table.component.scss']
})
export class LogsTableComponent implements AfterViewInit, OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatTable) table: MatTable<LogItemModel>;
  dataSource: LogsTableDataSource;

  constructor(private acc:LogService) { }

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['Time', 'Template', 'Hostname','Type','Message'];

  
    ngOnInit() {
      this.dataSource = new LogsTableDataSource();
      this.acc.getLog().subscribe(logs => {
        this.dataSource.data = logs;
        this.dataSource.refresh();
      });
    }
  

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.table.dataSource = this.dataSource;
  } 

}
