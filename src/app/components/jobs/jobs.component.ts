import { Component, ViewChild, OnInit } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {MatTable} from '@angular/material/table';
import {DialogBoxComponent } from './dialog-box/dialog-box.component';
import {SelectionModel} from '@angular/cdk/collections';
import {MatTableDataSource} from '@angular/material/table';
import {JobModel} from 'src/app/models/job';
import {JobsService} from 'src/app/services/jobs.service';
import { templateJitUrl } from '@angular/compiler';
import { NgModel } from '@angular/forms';


/*
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
*/



const ELEMENT_DATA: JobModel[] = [];

@Component({
  selector: 'app-jobs',
  templateUrl: './jobs.component.html',
  styleUrls: ['./jobs.component.scss']
})
export class JobsComponent implements OnInit {
  displayedColumns: string[] = ['id','template', 'client', 'action','active' ];
  dataSource = ELEMENT_DATA;
  counter = 5;
  /*
  dataSource1 = new MatTableDataSource<UsersData>(ELEMENT_DATA);
  selection = new SelectionModel<UsersData>(true, []);
  */
  dataSource1 = new MatTableDataSource<JobModel>(ELEMENT_DATA);
  selection = new SelectionModel<JobModel>(true, []);
  newjob = new JobModel;
  newjobni()
  {
    this.newjob.templateID=0
    /*this.jobsService.postJob()*/
  }

  @ViewChild(MatTable,{static:true}) table: MatTable<any>;

  constructor(public dialog: MatDialog, private jobsService: JobsService) {}

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
   /* var d = new Date();
    this.dataSource.push({
      id: this.counter,      
      client:row_obj.name,
      template: row_obj.template,
    });
    */

    let newJobAdd:JobModel = new JobModel();
    newJobAdd.id = row_obj.id;
    newJobAdd.computerID = Number(row_obj.name);
    newJobAdd.templateID = Number(row_obj.template);
    newJobAdd.active = row_obj.active; 

    
    console.log(newJobAdd);
      
   
    this.jobsService.postJob(newJobAdd).subscribe( job => {this.dataSource.push(job),this.table.renderRows();} )

   /*this.table.renderRows();    */
    
  }
  updateRowData(row_obj){
    this.dataSource = this.dataSource.filter((value,key)=>{
      if(value.id == row_obj.id){
        value.computerID = row_obj.name;
        value.templateID = row_obj.template;
      }
      return true;
    });
    
    let newJobAdd:JobModel = new JobModel();
    newJobAdd.id = 0;
    newJobAdd.computerID = Number(row_obj.name);
    newJobAdd.templateID = Number(row_obj.template);
    newJobAdd.active = row_obj.active; 
    console.log(newJobAdd);
    this.jobsService.putJob(newJobAdd).subscribe(job => {this.table.renderRows(),this.refreshjobs()});
    /*this.table.renderRows();    */    
  }
  refreshjobs()
  {
    this.jobsService.getJobs().subscribe( jobs => {this.dataSource=jobs,this.table.renderRows();} );
  }


  deleteRowData(row_obj){
    this.dataSource = this.dataSource.filter((value,key)=>{
      return value.id != row_obj.id;      
    });
    let newJobAdd:JobModel = new JobModel();
    newJobAdd.id = row_obj.id;
    newJobAdd.computerID = Number(row_obj.name);
    newJobAdd.templateID = Number(row_obj.template);
    newJobAdd.active = true; 

    this.jobsService.deleteJob(newJobAdd).subscribe(job => this.table.renderRows());
  }  

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected() ?
        this.selection.clear() :
        this.dataSource.forEach(row => this.selection.select(row));
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: JobModel): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'}`;
  }
  /*checkboxLabel(row?: UsersData): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.id + 1}`;
  */
   

 

  ngOnInit(): void {
    this.jobsService.getJobs().subscribe( jobs => {this.dataSource=jobs,this.table.renderRows();} )
    

  }

}
