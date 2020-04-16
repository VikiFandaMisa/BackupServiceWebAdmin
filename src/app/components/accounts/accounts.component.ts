import { Component, OnInit } from '@angular/core';

import { AccountsTableComponent } from './accounts-table/accounts-table.component';

@Component({
  selector: 'app-accounts',
  templateUrl: './accounts.component.html',
  styleUrls: ['./accounts.component.scss']
})
export class AccountsComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
