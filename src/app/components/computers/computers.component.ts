import { Component, OnInit } from '@angular/core';

import { ComputersTableComponent } from './computers-table/computers-table.component';

@Component({
  selector: 'app-computers',
  templateUrl: './computers.component.html',
  styleUrls: ['./computers.component.scss']
})
export class ComputersComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
