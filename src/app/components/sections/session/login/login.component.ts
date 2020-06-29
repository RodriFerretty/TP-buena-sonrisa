import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;

  constructor(public userService: UserService, 
    private spinner: NgxSpinnerService,
    public router: Router) { 
    this.loginForm = this.createFormGroup();
  }

  ngOnInit(): void { 
    this.loginForm.patchValue({
      email: "a@a.com",
      password: "123123"
    });
  }

  get model() {
    return this.loginForm.controls;
  }

  createFormGroup() {
    return new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required])
    });
  }

  onSubmit() {
    this.onSignIn()
  }

  onSignIn() {
    this.spinner.show()
    this.userService.loginAsUser(this.model.email.value, this.model.password.value).then((result) => {
      // console.log("Result en el login component: ", result)
      this.spinner.hide()
      this.router.navigate(['home'])
    }).catch((error) => {
      window.alert(error.message)
    })
  }
}
