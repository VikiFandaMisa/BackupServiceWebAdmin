import { Component, ViewChild, OnInit } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {MatTable} from '@angular/material/table';
import { DialogBoxComponent } from './dialog-box/dialog-box.component';
import {SelectionModel} from '@angular/cdk/collections';
import {MatTableDataSource} from '@angular/material/table';
import { templateJitUrl } from '@angular/compiler';


export interface UsersData {  
  id: number;
  client: string;
  template: string;
}

const ELEMENT_DATA: UsersData[] = [
  {id: 1,template:'fullbackucp', client: 'Windows10'},
  {id: 2,template: 'fullbackup', client: 'Windows8'},
  {id: 3,template: 'fullbackup', client: 'Winodws8'},
  {id: 4,template: 'fullbackup', client: 'Windows7'}
];

@Component({
  selector: 'app-jobs',
  templateUrl: './jobs.component.html',
  styleUrls: ['./jobs.component.scss']
})
export class JobsComponent implements OnInit {
  displayedColumns: string[] = ['id','template', 'client', 'action','active' ];
  dataSource = ELEMENT_DATA;
  counter = 5;
  dataSource1 = new MatTableDataSource<UsersData>(ELEMENT_DATA);
  selection = new SelectionModel<UsersData>(true, []);

  @ViewChild(MatTable,{static:true}) table: MatTable<any>;

  constructor(public dialog: MatDialog) {}

  openDialog(action,obj) {
    obj.action = action;
    const dialogRef = this.dialog.open(DialogBoxComponent, {
      width: '250px',
      data:obj
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result.event == 'Add'){
        this.addRowData(result.data);
      }else if(result.event == 'Update'){
        this.updateRowData(result.data);
      }else if(result.event == 'Delete'){
        this.deleteRowData(result.data);
      }
    });
  }

  addRowData(row_obj){
    var d = new Date();
    this.dataSource.push({
      id: this.counter,      
      client:row_obj.name,
      template: row_obj.template,
    });
    this.counter = this.counter+1
    this.table.renderRows();
    
  }
  updateRowData(row_obj){
    this.dataSource = this.dataSource.filter((value,key)=>{
      if(value.id == row_obj.id){
        value.client = row_obj.name;
        value.template = row_obj.template;
      }
      return true;
    });
  }
  deleteRowData(row_obj){
    this.dataSource = this.dataSource.filter((value,key)=>{
      return value.id != row_obj.id;
    });
  }  

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource1.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected() ?
        this.selection.clear() :
        this.dataSource1.data.forEach(row => this.selection.select(row));
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: UsersData): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.id + 1}`;
  }

  

 

  ngOnInit(): void {
  }

}
