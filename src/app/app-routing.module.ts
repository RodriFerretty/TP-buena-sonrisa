import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SessionComponent } from './components/sections/session/session.component';
import { HomeComponent } from './components/sections/home/home.component';
import { CreateAccountComponent } from './components/sections/create-account/create-account.component';


const routes: Routes = [
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'session',
    component: SessionComponent
  },
  {
    path: 'createAccount',
    component: CreateAccountComponent
  }
  ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
