import { Component } from "@angular/core";
import { MainService } from "src/app/services/main.service";

@Component({
    selector: 'app-error',
    templateUrl: './error.component.html',
    styleUrls: ['./error.component.css']
  })


export class ErrorComponent {
    

show:boolean=false;

    constructor(private service:MainService){
        this.updateFrameStatus();
    }


    updateFrameStatus(){
        this.service.updateFrame(this.show);
      }
}