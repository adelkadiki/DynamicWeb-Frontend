import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MainService } from 'src/app/services/main.service';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit {

  constructor(private router:Router, private service:MainService,
    private route:ActivatedRoute) { }

  ngOnInit() { 
      
    this.logoutSubmit();
   }

  logoutSubmit(){

     

    // localStorage.clear();
    // this.router.navigate(['login']);


  }

}