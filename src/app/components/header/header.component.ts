import { Component, Input, OnInit } from '@angular/core';
import { MainService } from 'src/app/services/main.service';



@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  display:boolean=false;
  constructor(private service:MainService) { }

  status:boolean  = false;
  show:boolean = true;  

  ngOnInit(): void {

    this.service.fstatus.subscribe(data =>{
      this.show = data;
      console.log('fstatus from header=>'+this.show );
    });

  }



  menuStatus(){

    if(this.status) {
      
    this.status = false;
    this.service.updateMenu(false);  

    } else {

      this.status = true;
      this.service.updateMenu(true);
    }
    
   
    

  }

}
