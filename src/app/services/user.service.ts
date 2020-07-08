import { Injectable } from '@angular/core';
import { User } from '../entities/user';
import { AngularFirestore } from '@angular/fire/firestore';
import { AuthService } from './auth.service';
import { AngularFireStorage, AngularFireUploadTask } from '@angular/fire/storage';
import { Observable, from } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  public currentUser: User;

  constructor(private authService: AuthService,
    private afStore: AngularFirestore,
    private afStorage: AngularFireStorage) {
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
    Use through app
  */
  //  public getAll() {
  //   return this.afStore.collection<Product>('products').valueChanges();
  // }
  public getAll() {
    return this.afStore.collection<User>('users').valueChanges();
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

  public signUpAsUser(newUser: User, password: string, picture: File): Promise<void> {
    return this.authService.signUp(newUser.email, password).then(createdUser => {
      this.addNewUserData(newUser, createdUser, picture)
    })
  }

  public getCurrentUser(): User {
    return this.currentUser;
  }

  private addNewUserData(newUser: User, user: firebase.auth.UserCredential, picture: File) {
    console.log("En addNewUserData")
    newUser.uid = user.user.uid
    user.user.updateProfile({
      displayName: newUser.displayName
    })
    /**
     * TODO: Add profile picture upload to Firebase Cloud Storage
     * https://www.youtube.com/watch?v=wRWZQwiNFnM
     * https://indepth.dev/implement-file-upload-with-firebase-storage/
     */
    if (picture) {
      const path = `profilePictures/${new Date().getTime()}_${picture.name}`

      const task = this.afStorage.upload(path, picture)

      this.getDownloadUrl$(task, path).subscribe(downloadURL => {
        user.user.updateProfile({
          photoURL: downloadURL
        })
        newUser.photoURL = downloadURL
        this.afStore.doc<User>(`users/${user.user.uid}`).set(Object.assign({}, newUser), { merge: true });
      })
    }

    this.afStore.doc<User>(`users/${user.user.uid}`).set(Object.assign({}, newUser), { merge: true });
  }

  private getDownloadUrl$(
    uploadTask: AngularFireUploadTask,
    path: string,
  ): Observable<string> {
    return from(uploadTask).pipe(
      switchMap((_) => this.afStorage.ref(path).getDownloadURL()),
    );
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
      this.addNewUserData(newUser, createdUser, null)
      console.log("En adminCreateUserAccount")
      this.authService.logoutCreatedUserAccount()
    }
    )
  }

}
