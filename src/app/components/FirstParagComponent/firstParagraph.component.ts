import { Component, OnInit } from "@angular/core";
import { MainService } from "src/app/services/main.service";
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
    selector: 'app-firstParagraph',
    templateUrl: './firstParagraph.component.html',
    styleUrls: ['./firstParagraph.component.css']
  })


export class FirstParagraphComponent implements OnInit {
    

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
    
          paragraph : ['', Validators.required],
          headline : ['']
            
            
        });
      }

      removeConfirm(){

        this.confirm=false;
        this.form=false;

      }

      formSubmit(){

        this.submitted=true;

        if(!this.lineForm.hasError('required', 'paragraph')){

         
                this.service.submitFirstParagraph(this.lineForm.value).subscribe({

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