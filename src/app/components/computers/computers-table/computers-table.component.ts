import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from "@angular/forms";

import { ComputerModel } from 'src/app/models/computer';
import { ComputersService } from 'src/app/services/computers.service'

@Component({
  selector: 'app-computers-table',
  templateUrl: './computers-table.component.html',
  styleUrls: ['./computers-table.component.scss']
})
export class ComputersTableComponent implements OnInit {
  isSubmitted = false;

  computers: ComputerModel[];

  constructor(public fb: FormBuilder, private computersService: ComputersService) { }

  selectedcomputer: any;

  /*########### Form ###########*/
  registrationForm = this.fb.group({
    computer: ['', [Validators.required]]
  })

  // Choose city using select dropdown
  changeComputer(e) {
    console.log(e.value)
    this.computer.setValue(e.target.value, {
      onlySelf: true
    })
  }

  getcomputerdata()
  {    
    this.selectedcomputer=JSON.stringify(this.registrationForm.value);        
  }

  // Getter method to access formcontrols
  get computer() {
    return this.registrationForm.get('computer');
  }

  /*########### Template Driven Form ###########*/
  
  onSubmit() {
    this.isSubmitted = true;
    if (!this.registrationForm.valid) {
      return false;
    } else {
      alert(JSON.stringify(this.registrationForm.value));
    }
  }

  ngOnInit(): void {
    this.computersService.fetchComputers().subscribe(computers => this.computers = computers);
  }

}