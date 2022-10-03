import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError } from 'rxjs';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, retry } from 'rxjs/operators';
import { User } from '../Models/User';
import { Headline } from '../Models/Headline';
import {Product} from '../Models/Product';






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

  isLoggedin(){
    return localStorage.getItem('access_token') ? true : false;
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


  submitLogo(image:File):Observable<any>{

    var formData = new FormData();
    formData.append("photo", image);
    
    return this.http.post(this.URL+'logo', formData, {responseType: 'text'})
    .pipe(
      catchError((error:HttpErrorResponse)=>{ 
        throw new Error("Logo uploading error = "+error.message); })
    );
}

submitFirstParagraph(paragraph:any):Observable<any>{

    return this.http.post(this.URL+'firstPargraph', paragraph, {responseType: 'text'})
    .pipe(
      catchError((error:HttpErrorResponse)=>{ 
        throw new Error("First paragraph error = "+error.message); })
    );
}


logoutSubmit():Observable<any>{

    return this.http.get(this.URL+'logout', {responseType: 'text'});
 
}


getAllHeadlines():Observable<any>{

  return this.http.get(this.URL+'getAllHeadlines');

}

submitSecondSectionImage(image:File):Observable<any>{

  var formData = new FormData();
  formData.append("sideImage", image);
  

  return this.http.post(this.URL+'sideImageUploading', formData, {responseType: 'text'})
  .pipe(
    catchError((error:HttpErrorResponse)=>{ 
      throw new Error("Side image uploading error = "+error.message); })
  );
}

submitProduct(product:Product):Observable<any>{

  // console.log(product.P_image1);
  //console.log(product.P_image2);

  var formData = new FormData();
  formData.append("description",product.P_description);
  formData.append("price", product.P_price);
  formData.append("image1", product.P_image1);
  if(product.P_image2)
  formData.append("image2", product.P_image2);

  return this.http.post(this.URL+'newProduct', formData, {responseType: 'text'})
  .pipe(
    catchError((error:HttpErrorResponse)=>{ 
      throw new Error("Product upload error = "+error.message); })
  );

 

  
}

}
