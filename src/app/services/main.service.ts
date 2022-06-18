import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError } from 'rxjs';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class MainService {

  URL:string = 'http://localhost:8000/api/';

  constructor(private http:HttpClient) { }

  private menu = new BehaviorSubject<boolean>(false);
  status = this.menu.asObservable();

  private frame = new BehaviorSubject<boolean>(true);
  fstatus = this.frame.asObservable();

  updateFrame(fstatus:boolean){
    this.frame.next(fstatus);
  }

  updateMenu(status: boolean){

    this.menu.next(status);
  }

  login():Observable{
    
  }

  getBackgroundImageLine(): Observable<any>{
    return this.http.get(this.URL+'getBackgroundImageHeadline', {responseType: 'text'});
    
  }

  getFirstParagraph():Observable<any>{
     
     return this.http.get(this.URL+'getFirstParagraph', {responseType: 'text'});
  }


  getSideParagraph():Observable<any>{
    return this.http.get(this.URL+'getSideParagraph', {responseType: 'text'});
  }


}
