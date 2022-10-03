import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BgilComponent } from './components/bgil/bgil.component';
import { ErrorComponent } from './components/Error/ErrorComponent';
import { LoginComponent } from './components/login/login.component';
import { MainComponent } from './components/main/main.component';
import { PanelComponent } from './components/panel/panel.component';
import { AuthGuard } from './guards/auth.guard';
import { BgiComponent } from './components/bgi/bgi.component';
import { LogoComponent } from './components/logo/logo.component';
import { LogoutComponent } from './components/logout/logout.component';
import { FirstParagraphComponent } from './components/FirstParagComponent/firstParagraph.component';
import { SecondSectionImageComponent } from './components/SecondSectionImage/SecondSectionImage.component';
import { AddProductComponent } from './components/add-product/add-product.component';
import { ContactComponent } from './components/contact/contact.component';
const routes: Routes = [

  
  {path:'home', component:MainComponent},
  {path:'login', component:LoginComponent},
  {path:'error', component:ErrorComponent},
  {path:'contact', component:ContactComponent},
  {path:'panel', component:PanelComponent, canActivate:[AuthGuard], canActivateChild:[AuthGuard],

  children:[ 

    {path:'bgil', component:BgilComponent},
    {path:'bgi', component:BgiComponent},
    {path:'logo', component:LogoComponent},
    {path:'logout', component:LogoutComponent},
    {path:'fparag', component:FirstParagraphComponent},
    {path:'ssi', component:SecondSectionImageComponent},
    {path:'product', component:AddProductComponent},
    
    
   ]

},
  
  {path:'', redirectTo:'home', pathMatch:'full'},
  { path: '**', redirectTo:'home', pathMatch:'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
