import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ErrorComponent } from './components/Error/ErrorComponent';
import { LoginComponent } from './components/login/login.component';
import { MainComponent } from './components/main/main.component';
import { PanelComponent } from './components/panel/panel.component';
import { AuthGuard } from './guards/auth.guard';



const routes: Routes = [

  
  {path:'home', component:MainComponent},
  {path:'login', component:LoginComponent},
  {path:'panel', component:PanelComponent, canActivate:[AuthGuard], canActivateChild:[AuthGuard],

  children:[ 

    {path:'error', component:ErrorComponent}
   ]

},
  
  {path:'', redirectTo:'home', pathMatch:'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
