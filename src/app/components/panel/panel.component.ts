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

  backgroundLine(){
    this.router.navigate(['bgil'], {relativeTo:this.route});
  }

  backgroundImage(){
    this.router.navigate(['bgi'], {relativeTo:this.route});
  }

  logo(){
    this.router.navigate(['logo'], {relativeTo:this.route});
  }

  firstParagraph(){
    this.router.navigate(['fparag'] , {relativeTo:this.route});
  }

  secondSection(){
    this.router.navigate(['ssi'] , {relativeTo:this.route});
  }

  addProduct(){
    this.router.navigate(['product'] , {relativeTo:this.route});
  }

  logoutSubmit(){

    this.router.navigate(['home']);
    this.service.logoutSubmit().subscribe({

      next: (data)=> localStorage.clear() ,
      error: (er)=> console.log(er)

    });

  }

}
