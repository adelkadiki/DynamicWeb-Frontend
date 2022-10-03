import { Component, OnInit, ElementRef, OnDestroy } from '@angular/core';
import { MainService } from "src/app/services/main.service";
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { ViewChild } from '@angular/core';
import { Product } from 'src/app/Models/Product';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit, OnDestroy {

  
  @ViewChild('fileUploader')
  fileUpload: ElementRef;

  @ViewChild('fileUploader2')
  fileUpload2: ElementRef;

 
submitProduct: Subscription | undefined;
show:boolean=false;
lineForm: FormGroup;
submitted:boolean=false;
confirm:boolean=false;
form:boolean=false;
errMsg:boolean=false;
file:any;
image2:any;
imgErr:boolean=false;
files:any=[];
product:Product;


    constructor(private service:MainService, private formBuilder:FormBuilder){
        this.updateFrameStatus();
    }

  ngOnDestroy(): void {

      this.submitProduct?.unsubscribe();
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
          // image1 : [null, Validators.required],
          // image2 : [null]
            
            
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
        this.imgErr = false;

        if (event.target.files.length > 0) {
          
          this.file = event.target.files[0];
        
          var ext = this.file.name.split('.').pop().toLowerCase();

             if(ext === 'jpg' || ext === 'png' || ext === 'jpeg'){
                
                            
                }else {
                  this.fileUpload.nativeElement.value=null;
                  this.errMsg = true;
                }     
            }

        }

        // Image2 validation 

        fileUploaded2(event:any){

          this.confirm = false;
          this.errMsg = false;
          this.submitted = false;
          this.imgErr = false;
  
          if (event.target.files.length > 0) {
            
            this.image2 = event.target.files[0];
            var ext = this.image2.name.split('.').pop().toLowerCase();
  
               if(ext === 'jpg' || ext === 'png' || ext === 'jpeg'){
  
                   this.files.push(this.image2);
               
                  } else {
  
                   // this.lineForm.reset();
                    this.fileUpload2.nativeElement.value=null;
                    this.errMsg = true;
  
                  }    
              }
  
          }
    
          // submit the form

      formSubmit(){

       

        this.submitted=true;
       
        if(!this.lineForm.hasError('required', 'description') 
        && !this.lineForm.hasError('required', 'price') ){

          if(this.fileUpload.nativeElement.value ===''){
              this.imgErr=true;
              return;
          }


             var des = this.lineForm.value.description;
             var price = this.lineForm.value.price;
           
             var imag1 = this.file;
             var imag2 = this.files.shift();
             if(!imag2)
             imag2='';


            //  var imag2 = this.files.shift();
           
            //  if(!imag2) 
           
            //  imag2 = '';
             
            var product = new Product(des, price, imag1, imag2);
            
            
          this.submitProduct = this.service.submitProduct(product).subscribe({
              
                    next: (data) => {this.confirm = true; 
                                    this.form = true;
                                    this.lineForm.reset(); 
                                    this.fileUpload.nativeElement.value = '';
                                    this.fileUpload2.nativeElement.value = '';
                                    imag2='';
                                  this.image2=''},
                    error: (er) => {this.confirm = false;
                                    this.form = true;}
               });

                this.submitted = false;
            
        }

      }

}
