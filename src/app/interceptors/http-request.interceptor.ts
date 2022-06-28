import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HTTP_INTERCEPTORS
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { MainService } from '../services/main.service';

@Injectable()
export class HttpRequestInterceptor implements HttpInterceptor {

  constructor(private service:MainService) {}

  //header:string = "Bearer "+this.service.jwtToken;
  

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    
    if(this.service.jwtToken){

    request = request.clone({

     setHeaders: { Authorization: "Bearer "+this.service.jwtToken }

    });
  }
    
    return next.handle(request);
  }
}

export const AuthInterceptorProvider = {

  provide : HTTP_INTERCEPTORS,
  useClass : HttpRequestInterceptor,
  multi : true

}