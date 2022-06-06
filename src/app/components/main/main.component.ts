import { Component, Input, OnInit } from '@angular/core';
import { MainService } from 'src/app/services/main.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  constructor(private service: MainService) { }

  menuStatus:boolean = false;
  mainLine:string='';
  firstParagraph:string='';
  
  
  ngOnInit(): void {

    this.service.status.subscribe(data =>{

      this.menuStatus=data;
    });

    this.getMainLine();
    this.getFirstParagraph();

  }

  getMainLine(){
    return this.service.getMainLine().subscribe({
      next: (data)=> this.mainLine=data,
      error: (er)=> {this.mainLine='Error from server'; 
      console.log('Main line error '+er)}

  });
  }

  getFirstParagraph(){
      return this.service.getFirstParagraph().subscribe({
          next: (data)=> this.firstParagraph=data,
          error: (er)=> {this.mainLine='Error from server';
          console.log('First paragraph error '+er)}
      });
  }

}
