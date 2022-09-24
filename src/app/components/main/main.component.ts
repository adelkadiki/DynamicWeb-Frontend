import { Component, OnDestroy, OnInit } from '@angular/core';
import { Headline } from 'src/app/Models/Headline';
import { MainService } from 'src/app/services/main.service';


@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit, OnDestroy {

  

  constructor(private service: MainService) { 
    this.updateFrameStatus();
  }

  menuStatus:boolean = false;
  //backgroundImageLine:string='this is testing line';
  imageLine:string='';
  firstHeadline:string='';
  firstParagraph:any='';
  sideParagraph:string='';
  headlines: Array<Headline>;
  
  
  ngOnInit(): void {

    this.menuUpdate();
    this.showFrame();

   // this.getBackgroundImageLine();
    this.getFirstParagraph();
    this.getSideParagraph();
    this.getAllHeadlines();

  }

  updateFrameStatus(){
    this.service.updateFrame(true);
  }

  menuUpdate(){
     this.service.status.subscribe(data =>{
       this.menuStatus=data;
  });
  }

  showFrame(){
    this.service.updateFrame(true);
  }

  // getBackgroundImageLine(){
  //   return this.service.getBackgroundImageLine().subscribe({
  //     next: (data)=> this.backgroundImageLine = data,
  //     error: (er)=> {this.backgroundImageLine ='Error from server'; 
  //     console.log('Background image headline error '+er)}

  // });
  // }

  getFirstParagraph(){
      return this.service.getFirstParagraph().subscribe({
          next: (data)=> this.firstParagraph = data ,
          error: (er)=> {this.firstParagraph ='Error from server';
          console.log('First paragraph error '+er)}
      });
  }

  getSideParagraph(){

    return this.service.getSideParagraph().subscribe({

      next: (data) => this.sideParagraph=data,
      error: (er) => { this.sideParagraph='Server error';
                      console.log('side paragraph '+er);}          

    });
  }

  getAllHeadlines(){

    return this.service.getAllHeadlines().subscribe({

      next: (data) => {  this.headlines=data; this.showHeadlines(this.headlines) } ,
      error: (er) => console.log(er)

    });

  }

  showHeadlines(lines:Headline[]){

    lines.forEach(h =>{

      if(h.title == 'background image line') this.imageLine = h.line ;
      if(h.title == 'first headline') this.firstHeadline = h.line;

      

    })

  }

  ngOnDestroy(): void{

    
   // this.getBackgroundImageLine().unsubscribe();
    this.getFirstParagraph().unsubscribe();
    this.getSideParagraph().unsubscribe();

  }


}

