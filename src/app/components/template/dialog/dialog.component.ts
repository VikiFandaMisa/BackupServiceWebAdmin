import { Component, Inject, Optional } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { NetworkModel } from 'src/app/models/network';

export interface NetworkData {
  server:string;
  name:string;
  passowrd:string;
  mode:number;
  encryption:number;  
}

interface list{
  value:number;
  viewtext:string;
}


@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})

export class DialogComponent  {

  Modes = ['Pasive','Active'];
  Encryption = ['None', 'Explicite','Implicite'];

  selectedmode:number;
  selectedencryption:number;

  moodes: list[] = [
    {value: 1, viewtext: 'Pasive'},
    {value: 2, viewtext: 'Active'},    
  ];

  encryptions: list[] = [
    {value: 1, viewtext: 'None'},
    {value: 2, viewtext: 'Explicit'},    
    {value: 3, viewtext: 'Implicit'},    
  ];


  action:string;
  local_data:any;

  constructor(
    public dialogRef: MatDialogRef<DialogComponent>,
    //@Optional() is used to prevent error if no data is passed
    @Optional() @Inject(MAT_DIALOG_DATA) public data: NetworkData) {
    console.log(data);
    this.local_data = {...data};
    this.action = this.local_data.action;
  }

  SetMode()
  {          
    this.local_data.mode=this.selectedmode;   
    console.log(this.local_data)
  }

  SetEncryption()
  {          
    this.local_data.encryption=this.selectedencryption;   
    console.log(this.local_data)
  }

  onclick()
  {
    if (this.local_data.active== true) {
      this.local_data.active=false;
    } else {
      this.local_data.active=true;
    }    
  }

  doAction(){
    this.dialogRef.close({event:this.action,data:this.local_data});
  }

  closeDialog(){
    this.dialogRef.close({event:'Cancel'});
  }
}
