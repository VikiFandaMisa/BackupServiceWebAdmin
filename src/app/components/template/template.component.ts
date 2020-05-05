import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Validators } from '@angular/forms';
import { FormArray } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { templateJitUrl } from '@angular/compiler';

    

@Component({
  selector: 'app-template',
  templateUrl: './template.component.html',
  styleUrls: ['./template.component.scss']  
})



export class TemplateComponent implements OnInit {
  showfield = false;

  //value = 5
  types = ['1', '2', '3'];

  selectedValue = '';  

  hourssaved = '*'
  weeksaved = '*'
  

  hours = '1 2 3 4 5 6 7 8 9 10 11 12 13 14 15 16 17 18 19 20 21 22 23 24'.split(' ');
  Days_Of_Week = '0 1 2 3 4 5 6 everyday'.split(' ');
  selectedDevice = 'two';
  SetHours(newValue) {
    //console.log(newValue);
    //this.selectedDevice = newValue;
    //this.updateTemplate(newValue);
    this.GetCronHours(newValue);
    this.GetWeekCron(this.weeksaved);    
    //var text = ''    
  }

  Setdays(newValue) {   
    if (newValue == 'everyday') {
      this.weeksaved = '*'      
    } else {
      this.weeksaved = newValue 
      
    }     
    this.GetWeekCron(this.weeksaved);      
  }

  TemplateForm = this.fb.group({
    Name: ['', Validators.required],
    Cronhours: ['', Validators.required],
    Name1: ['', Validators.required],
    type: [''],    
    Repeat: this.fb.group({
      Retence: [''],
      Start: [''],
      End: [''],      
    }),
    Paths: this.fb.array([
      this.fb.control('')
    ])
  });
  constructor(private fb: FormBuilder) { }

  GetCronHours(value: string) {
    var hourscron:string ='0 */'+value+' * * *'
    this.hourssaved = value     
    this.TemplateForm.patchValue({
      Cronhours: hourscron,           
    });
    this.TemplateForm.patchValue({
      Name1: hourscron,           
    });      
         
  }

  GetWeekCron(value: string) {
    var weekcron:string ='0 '+ this.hourssaved+' * * ' + value  
    this.TemplateForm.patchValue({
      Name1: weekcron,        
    });        
  }
  get Paths() {
    return this.TemplateForm.get('Paths') as FormArray;
  }
  addPath() {
    this.Paths.push(this.fb.control(''));
  }


  //submit = poslat template  (uložit template) využití první verzi cronu hodin
  onSubmit(value) {    
    if (value == 0) {      
        var text= this.TemplateForm.get('type')       
        this.TemplateForm.patchValue({
          Name: text         
        }); 
    } 
    //submit = poslat template uložit druhou verzi cronu (jenom určitou hodinu ve dnu)
    else  
    {
      this.TemplateForm.patchValue({
        Name: 'Nigger3',           
      }); 
    } 
  }   
  

  ngOnInit(): void {
  }

}
