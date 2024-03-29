import { Component, OnInit } from '@angular/core';
import { MainService } from 'src/app/services/main.service';
import { first } from 'rxjs/operators';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{

  //show:boolean=false;
  submitted:boolean=false;
  loginForm: FormGroup;
  errorMsg:string='';
  counter:number=0;

  constructor(private service:MainService, private formBuilder:FormBuilder,
    private router:Router) {
    
      this.updateFrameStatus();
  }
  

  ngOnInit(): void { 
    this.loginStatus();  
    this.formInit();
    this.counter=0;
  }


  loginStatus(){
    
    if(this.service.isLoggedin()){
       this.router.navigate(['panel']);
    }
  }  

  formInit(){

    this.loginForm = this.formBuilder.group({

        name : ['', Validators.required],
        password : ['', Validators.required],
        
    });
  }

  formSubmit(){

if(this.counter < 3){
   
      this.submitted=true;

          if(!this.loginForm.hasError('required', 'username') && !this.loginForm.hasError('required', 'password')){

      
              this.service.login(this.loginForm.value).subscribe({

                  next: (data)=> {this.router.navigate(['panel'])},
                  error: (er) => {
                  this.errorMsg = 'Incorrect username or password';
                  this.counter += 1;
        }

            });        
                this.loginForm.reset();
                this.submitted=false; 
    }
  
  } else {

      this.router.navigate(['error']);
  }
}

  errorRemove(){

     this.errorMsg='';
  }

  // login(){

  //   this.service.login(this.loginForm.value)
  //   .subscribe({
  //       next: (data) => console.log('seccessful login'),
  //       error: (e) => console.log(e)  
  //   });

  // }


  // loginSubmit(){

  // }


  updateFrameStatus(){
    this.service.updateFrame(false);
  }

}
