import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Validators } from '@angular/forms';
import { FormArray } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { templateJitUrl } from '@angular/compiler';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

    

@Component({
  selector: 'app-template',
  templateUrl: './template.component.html',
  styleUrls: ['./template.component.scss']  
})



export class TemplateComponent implements OnInit {
  showfield = false;

  //value = 5
  types = ['1', '2', '3'];
  Formats =['1', '2'];

  

  switched = 0 ;  
  lastday='';
  hour='*';
  minute='*';
  day='*';  


  hourssaved = '*'
  weeksaved = '*'
  
  schoosecron = '0 1'.split(' ');
  minutes= ' 1 2 3 4 5 6 7 8 9 10 11 11 12 13 14 15 16 17 18 19 20 21 22 23 24 25 26 27 28 29 30 31 32 33 34 35 36 37 38 39 40 41 42 43 44 45 46 47 48 49 50 51 52 53 54 55 56 57 58 59 60'.split(' ');
  hours = '1 2 3 4 5 6 7 8 9 10 11 12 13 14 15 16 17 18 19 20 21 22 23 24'.split(' ');
  Days_Of_Week = '0 1 2 3 4 5 6 everyday'.split(' ');
  selectedDevice = '2';  
 

  TemplateForm = this.fb.group({
    Name: ['', Validators.required],    
    Cron: ['', Validators.required],
    type: [''],
    Format: [''],   
    Repeat: this.fb.group({
      Retence: [''],
      Start: [''],
      End: [''],      
    }),    
    Pathsfrom: this.fb.array([
      this.fb.control('')
    ]),
    Paths: this.fb.array([
      this.fb.control('')
    ])
  });  

  AddDayoftheweek(value)
  {         
    if (value== 0) {
      if (this.Sunday==1) {
        this.Sundayt='';
        this.Sunday=0;
      }
      else {
        this.Sundayt=value+',';
        this.Sunday=1;  
      }          
    }
    if (value== 1) {
      if (this.Monday==1) {
        this.Mondayt='';
        this.Monday=0;
      }
      else {
        this.Mondayt=value+',';
        this.Monday=1;  
      }          
    }
    if (value== 2) {
      if (this.Tuesday==1) {
        this.Tuesdayt='';
        this.Tuesday=0;
      }
      else {
        this.Tuesdayt=value+',';
        this.Tuesday=1;  
      }          
    }
    if (value== 3) {
      if (this.Wednesday==1) {
        this.Wednesdayt='';
        this.Wednesday=0;
      }
      else {
        this.Wednesdayt=value+',';
        this.Wednesday=1;  
      }          
    }
    if (value== 4) {
      if (this.Thursday==1) {
        this.Thursdayt='';
        this.Thursday=0;
      }
      else {
        this.Thursdayt=value+',';
        this.Thursday=1;  
      }          
    }
    if (value== 5) {
      if (this.Friday==1) {
        this.Fridayt='';
        this.Friday=0;
      }
      else {
        this.Fridayt=value+',';
        this.Friday=1;  
      }          
    }
    if (value== 6) {
      if (this.Saturday==1) {
        this.Saturdayt='';
        this.Saturday=0;
      }
      else {
        this.Saturdayt=value+',';
        this.Saturday=1;  
      }          
    }  
    this.day= this.Sundayt + this.Mondayt+	this.Tuesdayt+	this.Wednesdayt+	this.Thursdayt +	this.Fridayt+	this.Saturdayt	
    this.day= this.day.substring(0,this.day.length-1)
    this.getcron()
    this.lastday = value;    
  }

  Sethours(value)
  {
    this.hour = value
    this.getcron()
  }

  Setminutes(value)
  {
    this.minute = value
    this.getcron()
  }

  reset()
  {
    this.minute='*'
    this.hour='*'
    this.day='*';
    this.getcron()
  }
  



  getcron()
  {
    /*
    if (this.day == '') {
      var textcron = this.minute + ' '+ this.hour+ ' * * *'
      this.TemplateForm.patchValue({
        Cron: textcron,           
      });
    }
    else{
      var textcron = this.minute + ' '+ this.hour+ ' * * '+ this.day.substring(0,this.day.length-1)
      this.TemplateForm.patchValue({
        Cron: textcron,           
      });
    }   
    */
    if (this.day == '') {
      var textcron = this.minute + ' '+ this.hour+ ' * * *'
      this.TemplateForm.patchValue({
        Cron: textcron,           
      });
    }   
    else {
      var textcron = this.minute + ' '+ this.hour+ ' * * '+ this.day
      this.TemplateForm.patchValue({
        Cron: textcron,           
      });
    }      

  } 
  
  SwitchCron(value)
  {    
    this.switched= value;     
  }
  SetHours(newValue) {
    //console.log(newValue);
    //this.selectedDevice = newValue;
    //this.updateTemplate(newValue);
    this.GetCronHours(newValue);
    //this.GetWeekCron(this.weeksaved);    
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

  
  constructor(private fb: FormBuilder) { }

  GetCronHours(value: string) {
    var hourscron:string ='0 */'+value+' * * *'
    this.hourssaved = value   
    this.TemplateForm.patchValue({
      Cron: hourscron,           
    });      
         
  }

  GetWeekCron(value: string) {
    var weekcron:string ='0 '+ this.hourssaved+' * * ' + value  
    this.TemplateForm.patchValue({
      Cron: weekcron,        
    });        
  }
  get Paths() {
    return this.TemplateForm.get('Paths') as FormArray;
  }

  set Name(value)
  {       
    this.Name= value
  }

  addPath() {    
    this.Paths.push(this.fb.control(''));    
    this.Pathsfrom.push(this.fb.control(''))
  }  

  get Name()
  {
    return this.TemplateForm.get('Name') as unknown as string;
  }

  get Pathsfrom()
  {
    return this.TemplateForm.get('Pathsfrom') as FormArray;
  }


  //submit = poslat template získat data 
  onSubmit() {    
      
        var text= this.TemplateForm.get('type')       
        this.TemplateForm.patchValue({
          Name: text         
        });     
    
   
  }   
  

  ngOnInit(): void {
  }
  
  
  
  
  
  
  
  
  
  
  Monday=0;	
  Tuesday=0;	
  Wednesday=0;	
  Thursday=0;	
  Friday=0;	
  Saturday=0;	
  Sunday=0;

  Mondayt='';	
  Tuesdayt='';	
  Wednesdayt='';	
  Thursdayt='';	
  Fridayt='';	
  Saturdayt='';	
  Sundayt='';

}
