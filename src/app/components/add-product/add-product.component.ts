import { Component, OnInit, ElementRef } from '@angular/core';
import { MainService } from "src/app/services/main.service";
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { ViewChild } from '@angular/core';
import { Product } from 'src/app/Models/Product';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {

  
  @ViewChild('fileUploader')
  fileUpload: ElementRef;

show:boolean=false;
lineForm: FormGroup;
submitted:boolean=false;
confirm:boolean=false;
form:boolean=false;
errMsg:boolean=false;
file:any;


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
    
          description : ['', Validators.required],
          price : ['', Validators.required],
          image1 : [null, Validators.required]
            
            
        });
      }

      removeConfirm(){

        this.confirm=false;
        this.form=false;

      }

      fileUploaded(event:any){

        this.confirm = false;
        this.errMsg = false;
        this.submitted = false;

        if (event.target.files.length > 0) {
          
          this.file = event.target.files[0];
          var ext = this.file.name.split('.').pop().toLowerCase();

             if(ext === 'jpg' || ext === 'png' || ext === 'jpeg'){

                 this.lineForm.patchValue({ photo : this.file});
                 this.lineForm.get('photo')?.updateValueAndValidity();
             
                } else {

                  this.lineForm.reset();
                  this.fileUpload.nativeElement.value=null;
                  this.errMsg = true;

                }    
           
        }

        }
    

      formSubmit(){

        this.submitted=true;

        if(!this.lineForm.hasError('required', 'description') 
        && !this.lineForm.hasError('required', 'price') && !this.lineForm.hasError('required', 'image1')){

             var des = this.lineForm.value.description;
             var price = this.lineForm.value.price;
             var image1 = this.file;
             var product = new Product(des, price, image1);
            
            
             this.service.submitProduct(product).subscribe({
              
                    next: (data) => {this.confirm = true; 
                                    this.form = true;
                                    this.lineForm.reset(); },
                    error: (er) => {this.confirm = false;
                                    this.form = true;}
               });

                this.submitted = false;
            
        }

      }

}
