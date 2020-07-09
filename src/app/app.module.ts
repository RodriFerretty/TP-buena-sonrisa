import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { environment } from 'src/environments/environment';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NgxSpinnerModule } from "ngx-spinner";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; 
import { AngularFireAuthGuard } from '@angular/fire/auth-guard';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NavigationBarComponent } from './components/navigation-bar/navigation-bar/navigation-bar.component';
import { HomeComponent } from './components/sections/home/home.component';
import { SessionComponent } from './components/sections/session/session.component';
import { LoginComponent } from './components/sections/session/login/login.component';
import { SignUpComponent } from './components/sections/session/sign-up/sign-up.component';
import { CreateAccountComponent } from './components/sections/create-account/create-account.component';
import { AppointmentsHomeComponent } from './components/sections/appointments/appointments-home/appointments-home.component';
import { AppointmentNewComponent } from './components/sections/appointments/appointment-new/appointment-new.component';
import { AppointmentDetailComponent } from './components/sections/appointments/appointment-detail/appointment-detail.component';

@NgModule({
  declarations: [
    AppComponent,
    NavigationBarComponent,
    HomeComponent,
    SessionComponent,
    LoginComponent,
    SignUpComponent,
    CreateAccountComponent,
    AppointmentsHomeComponent,
    AppointmentDetailComponent,
    AppointmentNewComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireDatabaseModule,
    AngularFireStorageModule,
    ReactiveFormsModule,
    FormsModule,
    NgxSpinnerModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
