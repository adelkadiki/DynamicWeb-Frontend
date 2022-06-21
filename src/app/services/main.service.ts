import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError } from 'rxjs';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map } from 'rxjs/operators';
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
      ,catchError((error:HttpErrorResponse)=>{ throw new Error("Login error = "+error) })
      
    );
  }

  logout() {
    localStorage.removeItem('access_token');
  }

  public get loggedIn(): boolean {
    return (localStorage.getItem('access_token') !== null);
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


}
