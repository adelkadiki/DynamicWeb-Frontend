import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError } from 'rxjs';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, retry } from 'rxjs/operators';
import { User } from '../Models/User';






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

  // LOGIN AND LOGOUT
  login(user:User):Observable<boolean>{
    
    return this.http.post<{token: string}>(this.URL+'login', user)
    .pipe(
      map(data => {
        
        localStorage.setItem('access_token', data.token);
        return true;
      })
      ,catchError((error:HttpErrorResponse)=>{ throw new Error("Login error = "+error.message) })
      
    );
  }

  logout() {
    localStorage.removeItem('access_token');
  }

  public get loggedIn(): boolean {
    return (localStorage.getItem('access_token') !== null);
  }

  public get jwtToken():string | null{
    return localStorage.getItem('access_token');
  }

  // LOGIN AND LOGOUT

  getBackgroundImageLine(): Observable<any>{
    return this.http.get(this.URL+'getBackgroundImageHeadline', {responseType: 'text'});
    
  }

  getFirstParagraph():Observable<any>{
     
     return this.http.get(this.URL+'getFirstParagraph', {responseType: 'text'});
  }


  getSideParagraph():Observable<any>{
    return this.http.get(this.URL+'getSideParagraph', {responseType: 'text'});
  }

  submitBackgroundImageLine(line:any):Observable<any>{

    return this.http.post(this.URL+'backgroundImageLine', line, {responseType: 'text'})
    .pipe(
      catchError((error:HttpErrorResponse)=>{ 
        throw new Error("Background Image Line error = "+error.message); })
    );;
  }

  submitBackgroundImage(image:File):Observable<any>{

      var formData = new FormData();
      formData.append("bg", image);
      

      return this.http.post(this.URL+'bg', formData, {responseType: 'text'})
      .pipe(
        catchError((error:HttpErrorResponse)=>{ 
          throw new Error("Image uploading error = "+error.message); })
      );
  }

}
