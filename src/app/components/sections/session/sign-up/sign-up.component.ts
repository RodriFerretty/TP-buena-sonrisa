import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/entities/user';
import { NgxSpinnerService } from 'ngx-spinner';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {
  signUpForm: FormGroup;
  public selectedPicture: File = null

  constructor(private userService: UserService, 
    private spinner: NgxSpinnerService,
    public router: Router) {
    this.signUpForm = this.createFormGroup();
  }

  ngOnInit(): void {
  }

  onSubmit() {
    this.onSignUp()
  }

  get model() {
    return this.signUpForm.controls;
  }

  createFormGroup() {
    return new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      username: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)]),
      picture: new FormControl('', [Validators.required]),
    });
  }

  onPictureSelected(event) {
    // console.log(event);
    this.selectedPicture = <File>event.target.files[0]
    this.signUpForm.controls['picture'].setValue(this.selectedPicture ? this.selectedPicture.name : ''); // <-- Set Value for Validation
  }

  onSignUp() {
    this.spinner.show()
    const newUser = new User()
    newUser.email = this.model.email.value
    newUser.displayName = this.model.username.value
    newUser.role = "client"
    this.userService.signUpAsUser(newUser, this.model.password.value, this.selectedPicture).then((result) => {
      this.spinner.hide()
      // this.userService.logoutAsUser()
      this.router.navigate(['home'])
    }).catch((error) => {
      window.alert(error.message)
    })
  }



}
