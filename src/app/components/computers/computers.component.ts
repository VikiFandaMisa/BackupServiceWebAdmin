import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from "@angular/forms";

import { ComputerFormComponent } from './computer-form/computer-form.component';
import { ComputerModel } from 'src/app/models/computer';
import { ComputersService } from 'src/app/services/computers.service';

@Component({
  selector: 'app-computers',
  templateUrl: './computers.component.html',
  styleUrls: ['./computers.component.scss']
})
export class ComputersComponent implements OnInit {

  constructor(public fb: FormBuilder, private computersService: ComputersService) { }

  computersArray: ComputerModel[];

  computersForm = this.fb.group({
    computers: ['', []]
  })

  changeComputer(e) {
    this.computers.setValue(e.target.value, {
      onlySelf: true
    })
    this.onSubmit();
  }

  get computers() {
    return this.computersForm.get('computers');
  }
  
  onSubmit() {
  }

  ngOnInit(): void {
    this.computersService.fetchComputers().subscribe(computers => { this.computersArray = computers; });
  }

}
