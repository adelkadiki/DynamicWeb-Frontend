import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MainService } from 'src/app/services/main.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  show:boolean=false;

  constructor(private service:MainService) {
  
    this.updateFrameStatus();
  }
  

  ngOnInit(): void { 
    
  }

  updateFrameStatus(){
    this.service.updateFrame(this.show);
  }

}
