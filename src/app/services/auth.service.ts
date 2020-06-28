import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import * as firebase from "firebase/app";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  //Create account wiithout kick out current user (Create account as admin)
  //https://stackoverflow.com/questions/37517208/firebase-kicks-out-current-user/38013551#38013551
  private afAuth2 = firebase.initializeApp(environment.firebaseConfig, 'secondaryInstanceForAdmin');


  constructor(private afAuth: AngularFireAuth) { }

  /*
   General user session management.
  */
  public login(email: string, password: string): Promise<firebase.auth.UserCredential> {
    return this.afAuth.signInWithEmailAndPassword(email, password)
  }

  public logout(): Promise<void> {
    return this.afAuth.signOut()
  }

  public signUp(email: string, password: string): Promise<firebase.auth.UserCredential> {
    return this.afAuth.createUserWithEmailAndPassword(email, password)
  }

  public getCurrentUser(): Observable<firebase.User> {
    return this.afAuth.user
  }

  /*
   Admin account creation.
  */
  public adminCreateUserAccount(email: string, password: string): Promise<firebase.auth.UserCredential> {
    return this.afAuth2.auth().signInWithEmailAndPassword(email, password)
  }

  public logoutCreatedUserAccount() {
    return this.afAuth2.auth().signOut()
  }
}
