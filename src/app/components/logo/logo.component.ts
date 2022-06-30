import { Component, ElementRef, OnInit } from "@angular/core";
import { MainService } from "src/app/services/main.service";
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { ViewChild } from '@angular/core';

@Component({
    selector: 'app-logo',
    templateUrl: './logo.component.html',
    styleUrls: ['./logo.component.css']
  })


export class LogoComponent implements OnInit {
    
  @ViewChild('fileUploader')
  fileUpload: ElementRef;


show:boolean=false;
imageForm: FormGroup;
submitted:boolean=false;
file:any;
errMsg:boolean=false;
confirm:boolean=false;
form:boolean=false;


    constructor(private service:MainService, private formBuilder:FormBuilder){
        this.updateFrameStatus();
    }

    ngOnInit(): void {
        
            this.formInit();
            //this.form = false;
    }


    updateFrameStatus(){
        this.service.updateFrame(this.show);
      }

      formInit(){

        this.imageForm = this.formBuilder.group({
    
            photo : ['' , Validators.required]
            
            
        });
      }

      fileUploaded(event:any){

        this.confirm = false;
        this.errMsg = false;
        this.submitted = false;

        if (event.target.files.length > 0) {
          
          this.file = event.target.files[0];
          var ext = this.file.name.split('.').pop().toLowerCase();

             if(ext === 'jpg' || ext === 'png' || ext === 'jpeg'){

                 this.imageForm.patchValue({ photo : this.file});
                 this.imageForm.get('photo')?.updateValueAndValidity();
             
                } else {

                  this.imageForm.reset();
                  this.fileUpload.nativeElement.value=null;
                  this.errMsg = true;

                }
          
           
        }

        // this.imageForm.patchValue({ bg : this.file});
        // this.imageForm.get('bg')?.updateValueAndValidity();

        }
      
      
      formSubmit(){

        this.submitted=true;

        if(!this.imageForm.hasError('required', 'photo')){

                
                this.service.submitLogo(this.imageForm.value.photo).subscribe({

                    next: (data) => { this.fileUpload.nativeElement.value='' ;
                                    this.confirm=true;},
                    error: (er) => { console.log(er);}
                });
               
                
                this.submitted = false;
            
        }

      }
}