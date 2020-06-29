import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/entities/user';
import { NgxSpinnerService } from 'ngx-spinner';
import { Router } from '@angular/router';


@Component({
  selector: 'app-create-account',
  templateUrl: './create-account.component.html',
  styleUrls: ['./create-account.component.css']
})
export class CreateAccountComponent implements OnInit {
  public roles: String[] = ["Cliente", "Especialista", "Recepcionista"]
  createAccountForm: FormGroup;

  constructor(private userService: UserService, 
    private spinner: NgxSpinnerService,
    public router: Router) {
    this.createAccountForm = this.createFormGroup();
  }

  ngOnInit(): void {
  }

  onSubmit() {
    this.onCreateNewAccount()
  }

  get model() {
    return this.createAccountForm.controls;
  }

  createFormGroup() {
    return new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      role: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)])
    });
  }

  onCreateNewAccount() {
    this.spinner.show()
    const newUser = new User()
    newUser.email = this.model.email.value
    newUser.role = this.model.role.value
    this.userService.adminCreateUserAccount(newUser, this.model.password.value).then((result) => {
      this.createAccountForm.reset()
      this.spinner.hide()
      this.router.navigate(['home'])
    }).catch((error) => {
      window.alert(error.message)
    })
  }

}
