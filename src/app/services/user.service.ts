import { Injectable } from '@angular/core';
import { User } from '../entities/user';
import { AngularFirestore } from '@angular/fire/firestore';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private currentUser: User;

  constructor(private authService: AuthService, private afStore: AngularFirestore) {
    //authService.getCurrentUser returns an Observable of afAuth.authState. Sets currentUser on login/logout
    authService.getCurrentUser().subscribe(currentUser => {
      if (currentUser) {
        // console.log("Seteo de currentUser en UserService: ", currentUser)
        this.getLoggedInUser(currentUser.uid).subscribe(loggedInUser => {
          // console.log("Seteo de currentUser en UserService: ", loggedInUser)
          this.currentUser = loggedInUser
        })
      } else {
        // console.log("Seteo null en userService.")
        this.currentUser = null
      }
    });
  }

  /*
   General user session management.
  */
  public loginAsUser(email: string, password: string): Promise<firebase.auth.UserCredential> {
    return this.authService.login(email, password);
  }

  public logoutAsUser(): Promise<void> {
    return this.authService.logout()
  }

  public signUpAsUser(newUser: User, password: string): Promise<void> {
    return this.authService.signUp(newUser.email, password).then(createdUser => {
      this.addNewUserData(newUser, createdUser)
    }
    )
  }

  public getCurrentUser(): User {
    return this.currentUser;
  }

  private addNewUserData(newUser: User, user: firebase.auth.UserCredential) {
    console.log("En addNewUserData")
    newUser.uid = user.user.uid
    user.user.updateProfile({
      displayName: newUser.displayName
    })
    /**
     * TODO: Add profile picture upload to Firebase Cloud Storage
     */
    this.afStore.doc<User>(`users/${user.user.uid}`).set(Object.assign({}, newUser), { merge: true });
  }

  private getLoggedInUser(uid: string) {
    return this.afStore.doc<User>(`users/${uid}`).valueChanges();
  }

  /*
   Admin account creation.
  */
  
  public adminCreateUserAccount(newUser: User, password: string): Promise<void> {
    return this.authService.adminCreateUserAccount(newUser.email, password).then(createdUser => {
      console.log("En adminCreateUserAccount UserService:", createdUser)
      this.addNewUserData(newUser, createdUser)
      console.log("En adminCreateUserAccount")
      this.authService.logoutCreatedUserAccount()
    }
    )
  }

}
