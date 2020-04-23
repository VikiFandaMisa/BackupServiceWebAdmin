import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from "@angular/forms";

let userTestStatus: { id: number, name: string }[] = [
  { "id": 0, "name": "Available" },
  { "id": 1, "name": "Ready" },
  { "id": 2, "name": "Started" }
];


@Component({
  selector: 'app-computers-table',
  templateUrl: './computers-table.component.html',
  styleUrls: ['./computers-table.component.scss']
})
export class ComputersTableComponent implements OnInit {
  isSubmitted = false;

  
  // City Names
  City: any = ["hello", 'South Dakota', 'Tennessee', 'Michigan']

  constructor(public fb: FormBuilder) { }

  selectedcomputer:any;

  /*########### Form ###########*/
  registrationForm = this.fb.group({
    cityName: ['', [Validators.required]],
    citysize: ['', [Validators.required]]
  })


  // Choose city using select dropdown
  changeCity(e) {
    console.log(e.value)
    this.cityName.setValue(e.target.value, {
      onlySelf: true
    })
  }

  getcomputerdata()
  {    
    this.selectedcomputer=JSON.stringify(this.registrationForm.value);        
  }

  // Getter method to access formcontrols
  get cityName() {
    return this.registrationForm.get('cityName');
  }

  /*########### Template Driven Form ###########*/
  
  onSubmit() {
    this.isSubmitted = true;
    if (!this.registrationForm.valid) {
      return false;
    } else {
      (JSON.stringify(this.registrationForm.value))
    }

  }
  

  ngOnInit(): void {
  }

}

//----


