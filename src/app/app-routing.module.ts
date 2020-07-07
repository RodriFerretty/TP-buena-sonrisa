import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SessionComponent } from './components/sections/session/session.component';
import { HomeComponent } from './components/sections/home/home.component';
import { CreateAccountComponent } from './components/sections/create-account/create-account.component';
import { AppointmentsHomeComponent } from './components/sections/appointments/appointments-home/appointments-home.component';
import { redirectUnauthorizedTo, redirectLoggedInTo, AngularFireAuthGuard } from '@angular/fire/auth-guard';

const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo(['session']);
const redirectLoggedInToHome = () => redirectLoggedInTo(['home']);

const routes: Routes = [
  {
    path: 'home',
    component: AppointmentsHomeComponent,
    canActivate: [AngularFireAuthGuard], 
    data: { authGuardPipe: redirectUnauthorizedToLogin }
  },
  {
    path: 'session',
    component: SessionComponent
  },
  {
    path: 'createAccount',
    component: CreateAccountComponent,
    canActivate: [AngularFireAuthGuard], 
    data: { authGuardPipe: redirectUnauthorizedToLogin }
  },
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full'
},
{
    path: '**',
    redirectTo: '/home',
    pathMatch: 'full'
}
  ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
