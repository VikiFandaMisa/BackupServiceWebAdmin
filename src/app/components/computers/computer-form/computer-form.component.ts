import { Component, Input, ChangeDetectionStrategy, OnChanges, SimpleChanges } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from "@angular/forms";

import { ComputerModel, ComputerStatus, ComputerStatusUtils } from 'src/app/models/computer';
import { ComputersService } from 'src/app/services/computers.service';

@Component({
  selector: 'app-computer-form',
  templateUrl: './computer-form.component.html',
  styleUrls: ['./computer-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ComputerFormComponent implements OnChanges {
  @Input()
  computer: ComputerModel;

  computerStatus = ComputerStatus;
  statusToString = ComputerStatusUtils.toString;

  constructor(public fb: FormBuilder, private computersService: ComputersService) { }

  computerForm: FormGroup;

  changeStatus(e) {
    this.status.setValue(e.target.value, {
      onlySelf: true
    })
    this.computer.status = this.computerForm.value.status;
    this.onSubmit();
  }

  get status() {
    return this.computerForm.get('status');
  }
  
  onSubmit() {
    this.computersService.putComputer(this.computer).subscribe();
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.computerForm = this.fb.group({
      status: [this.computer.status, [Validators.required]]
    })
  }
}
