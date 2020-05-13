import {SelectionModel} from '@angular/cdk/collections';
import { Component, OnInit } from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';

export interface TemplateClient {
  template: string;
  position: number;
  client: number;
  symbol: string;
}

const ELEMENT_DATA: TemplateClient[] = [
  {position: 1, template: 'Hydrogen', client: 1.0079, symbol: 'H'},
  {position: 2, template: 'Helium', client: 4.0026, symbol: 'He'},
  {position: 3, template: 'Lithium', client: 6.941, symbol: 'Li'},
  {position: 4, template: 'Beryllium', client: 9.0122, symbol: 'Be'},
  {position: 5, template: 'Boron', client: 10.811, symbol: 'B'},
  {position: 6, template: 'Carbon', client: 12.0107, symbol: 'C'},
  {position: 7, template: 'Nitrogen', client: 14.0067, symbol: 'N'},
  {position: 8, template: 'Oxygen', client: 15.9994, symbol: 'O'},
  {position: 9, template: 'Fluorine', client: 18.9984, symbol: 'F'},
  {position: 10, template: 'Neon', client: 20.1797, symbol: 'Ne'},
];

@Component({
  selector: 'app-jobs',
  templateUrl: './jobs.component.html',
  styleUrls: ['./jobs.component.scss']
})
export class JobsComponent implements OnInit {
  displayedColumns: string[] = ['position', 'template', 'client','active'];
  dataSource = new MatTableDataSource<TemplateClient>(ELEMENT_DATA);
  selection = new SelectionModel<TemplateClient>(true, []);

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

   /** Selects all rows if they are not all selected; otherwise clear selection. */
   masterToggle() {
    this.isAllSelected() ?
        this.selection.clear() :
        this.dataSource.data.forEach(row => this.selection.select(row));
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: TemplateClient): string {
    if (!row) {
      return `${this.isAllSelected() ? 'client' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'client'} row ${row.position + 1}`;
  }

  constructor() { }

  ngOnInit(): void {
  }

}
