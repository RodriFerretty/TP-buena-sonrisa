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
    
  }

  setLoginValues(email: string){
    this.loginForm.patchValue({
      email: email,
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
      this.router.navigate(['home'])
    }).finally(() => {
      this.spinner.hide()
    }).catch((error) => {
      window.alert(error.message)
    })
  }
}
