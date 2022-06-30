import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatTableModule } from '@angular/material/table';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainComponent } from './components/main/main.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { HttpClientModule } from '@angular/common/http';
import { LoginComponent } from './components/login/login.component';
import {MatInputModule} from '@angular/material/input';
import { JwtModule } from '@auth0/angular-jwt';
import { AuthGuard } from './guards/auth.guard';
import { MainService } from './services/main.service';
import { MatButtonModule } from '@angular/material/button';
import {MatFormFieldModule} from '@angular/material/form-field';
import {ReactiveFormsModule, FormsModule} from '@angular/forms';
import { ErrorComponent } from './components/Error/ErrorComponent';
import { PanelComponent } from './components/panel/panel.component';
import { BgilComponent } from './components/bgil/bgil.component';
import {AuthInterceptorProvider} from './interceptors/http-request.interceptor';
import { BgiComponent } from './components/bgi/bgi.component';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { LogoComponent } from './components/logo/logo.component';


export function tokenGetter() {
  return localStorage.getItem('access_token');
}

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    HeaderComponent,
    FooterComponent,
    LoginComponent,
    ErrorComponent,
    PanelComponent,
    BgilComponent,
    BgiComponent,
    LogoComponent
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatTableModule,
    MatInputModule,
    MatTableModule,
    MatFormFieldModule,
    MatButtonModule, 
    ReactiveFormsModule,
    FormsModule,
    MatProgressSpinnerModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        allowedDomains: ['localhost:8000'],
        disallowedRoutes: []
      }
    })
  ],
  providers: [MainService, AuthGuard, AuthInterceptorProvider],
  bootstrap: [AppComponent]
})
export class AppModule { }
