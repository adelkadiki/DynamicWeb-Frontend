import { ThisReceiver } from '@angular/compiler';
import { AfterViewChecked, Component, OnInit } from '@angular/core';
import { MainService } from './services/main.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, AfterViewChecked{

  show:boolean=true;
  

  constructor(private service:MainService) { }
  
  ngAfterViewChecked(): void {
    this.getFrameStatus();
  }
  
  

  ngOnInit(): void {

   
  }
  title = 'dw';


  getFrameStatus(){
    this.service.fstatus.subscribe(data=>{
      this.show=data;
    })
  }

}
