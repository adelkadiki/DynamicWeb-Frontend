import { Component, Input, OnInit } from '@angular/core';
import { MainService } from 'src/app/services/main.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {


  constructor(private service:MainService) { }

  status:boolean  = false;

  ngOnInit(): void {
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
