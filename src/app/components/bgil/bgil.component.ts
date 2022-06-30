import { Component, OnInit } from "@angular/core";
import { MainService } from "src/app/services/main.service";
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
    selector: 'app-bgil',
    templateUrl: './bgil.component.html',
    styleUrls: ['./bgil.component.css']
  })


export class BgilComponent implements OnInit {
    

show:boolean=false;
lineForm: FormGroup;
submitted:boolean=false;
confirm:boolean=false;
form:boolean=false;


    constructor(private service:MainService, private formBuilder:FormBuilder){
        this.updateFrameStatus();
    }

    ngOnInit(): void {
        
            this.formInit();
            this.form = false;
    }


    updateFrameStatus(){
        this.service.updateFrame(this.show);
      }

      formInit(){

        this.lineForm = this.formBuilder.group({
    
            line : ['', Validators.required]
            
            
        });
      }

      removeConfirm(){

        this.confirm=false;
        this.form=false;

      }

      formSubmit(){

        this.submitted=true;

        if(!this.lineForm.hasError('required', 'line')){

          
                this.service.submitBackgroundImageLine(this.lineForm.value).subscribe({

                    next: (data) => {this.confirm = true; 
                                    this.form = true;
                                    this.lineForm.reset();},
                    error: (er) => {this.confirm = false;
                                    this.form = true;}
                });

                this.submitted = false;
            
        }

      }
}