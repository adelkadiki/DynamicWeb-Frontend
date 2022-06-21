import { Component, OnInit } from '@angular/core';
import { MainService } from 'src/app/services/main.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-panel',
  templateUrl: './panel.component.html',
  styleUrls: ['./panel.component.css']
})
export class PanelComponent implements OnInit {

  show:boolean=false;
  constructor(private service:MainService, private router:Router,
    private route:ActivatedRoute) { 
    this.updateFrameStatus();
  }

  ngOnInit(): void {

  }



  updateFrameStatus(){
    this.service.updateFrame(this.show);
  }

  linkToPage(){
    this.router.navigate(['error'], {relativeTo:this.route});
  }

}
